import app from './app';
import { config } from './config';
import { initDatabase } from './database';
import http from 'http';
import { Server } from 'socket.io';
import { OrderMessage } from './modules/orders/models/orderMessage.model';
import { Notification } from './modules/notifications/models/notification.model';
import { Order } from './modules/orders/models/order.model';

const { sequelize, models } = initDatabase();

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync({alter: true}); // Use with caution in production
  app.locals.models = models;
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  io.on('connection', (socket) => {
    socket.on('identify', (userId: string) => {
      if (userId) socket.join(`user:${userId}`);
    });
    socket.on('joinOrder', (orderId: string) => {
      socket.join(`order:${orderId}`);
    });

    socket.on('sendOrderMessage', async (payload: any) => {
      const { orderId, sender, role, text, clientId } = payload;
      if (!orderId || !sender || !role || !text) return;
      const msg = await OrderMessage.create({ orderId, sender, role, text });
      io.to(`order:${orderId}`).emit('orderMessage', {
        id: msg.id,
        sender: msg.sender,
        role: msg.role,
        text: msg.text,
        createdAt: msg.createdAt,
        clientId,
      });
    });

    socket.on('orderCompleted', async (payload: any) => {
      const { orderId } = payload;
      if (!orderId) return;
      const order = await Order.findByPk(orderId);
      if (!order || !order.createdBy) return;
      const note = await Notification.create({
        userId: order.createdBy,
        title: 'Order Completed',
        message: `Order ${order.orderNumber || order.id} has been completed by production.`,
        data: { orderId: order.id },
      });
      io.to(`user:${order.createdBy}`).emit('notification', note);
    });
  });

  server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

start();
