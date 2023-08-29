export const getPaginateRange = (page: number, limit: number) => {
  const from = limit * (page - 1);
  const to = from + limit - 1;

  return [from, to];
};
