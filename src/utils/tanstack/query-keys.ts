export const mealRecordkeys = {
  all: () => ["mealRecords"] as const,

  dailyList: (userId: string, date: string) =>
    [...mealRecordkeys.all(), userId, date] as const,
};

export const foodskeys = {
  all: () => ["foods"] as const,

  list: (query?: string) => [...foodskeys.all(), { query }] as const,
};
