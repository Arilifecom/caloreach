export const mealRecordkeys = {
  all: () => ["mealRecords"] as const,

  dailyList: (userId: string, date: string) =>
    [...mealRecordkeys.all(), userId, date] as const,

  todayTotal: (userId: string, date: string) =>
    [...mealRecordkeys.dailyList(userId, date), "todayTotal"] as const,
};

export const foodskeys = {
  all: () => ["foods"] as const,

  list: (query?: string) => [...foodskeys.all(), { query }] as const,
};

export const RegularFoodskeys = {
  all: () => ["RegularFoods"] as const,

  list: (userId: string) => [...RegularFoodskeys.all(), userId] as const,
};

export const TargetKcalkeys = {
  all: () => ["targetKcal"] as const,

  list: (userId: string) => [...TargetKcalkeys.all(), "list", userId] as const,

  effective: (userId: string) =>
    [...TargetKcalkeys.all(), "effective", userId] as const,
};
