export type DateRange = "1d" | "5d" | "1m" | "3m" | "6m" | "1y";

export interface GainLoss {
  gain: boolean;
  diff: number;
  percent: number;
}
