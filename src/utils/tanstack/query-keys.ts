export const mealRecordkeys = {
  all: () => ["mealRecords"] as const,
};

export const foodskeys = {
  all: () => ["foods"] as const,

  list: (query?: string) => [...foodskeys.all(), { query }] as const,
};
