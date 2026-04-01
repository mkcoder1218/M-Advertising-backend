export const logger = {
  info: (message: string, meta?: unknown) => {
    if (meta) console.log(message, meta);
    else console.log(message);
  },
  error: (message: string, meta?: unknown) => {
    if (meta) console.error(message, meta);
    else console.error(message);
  },
};