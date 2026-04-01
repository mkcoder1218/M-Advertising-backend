export const getPagination = (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  return { limit, offset };
};