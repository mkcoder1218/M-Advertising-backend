import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { requestLogger } from './middleware/logging.middleware';
import { errorHandler } from './middleware/error.middleware';
import { swaggerDocument } from './shared/swagger';
import authRoutes from './modules/auth/routes/auth.routes';
import userRoutes from './modules/users/routes/users.routes';
import roleRoutes from './modules/roles/routes/roles.routes';
import inventoryRoutes from './modules/inventory/routes/inventory.routes';
import productionRoutes from './modules/production/routes/production.routes';
import teamRoutes from './modules/teams/routes/teams.routes';
import procurementRoutes from './modules/procurement/routes/procurement.routes';
import orderRoutes from './modules/orders/routes/orders.routes';
import salesRoutes from './modules/sales/routes/sales.routes';
import tenderRoutes from './modules/tender/routes/tender.routes';
import hrRoutes from './modules/hr/routes/hr.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/inventory', inventoryRoutes);
app.use('/api/v1/production', productionRoutes);
app.use('/api/v1/teams', teamRoutes);
app.use('/api/v1/procurement', procurementRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/sales', salesRoutes);
app.use('/api/v1/tenders', tenderRoutes);
app.use('/api/v1/hr', hrRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;