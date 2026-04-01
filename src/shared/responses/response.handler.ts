export const respond = {
  ok: (res: any, data: any) => res.status(200).json(data),
  created: (res: any, data: any) => res.status(201).json(data),
  noContent: (res: any) => res.status(204).send(),
};