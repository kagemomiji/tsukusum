export const StoreType = {
  COOL: '冷蔵',
  FREEZE: '冷凍',
} as const;

export type StoreType = typeof StoreType[keyof typeof StoreType];
// 全てのtypeを配列として取得
export const AllStoreType = Object.values(StoreType);