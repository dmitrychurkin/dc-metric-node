export interface IMetricBase {
  readonly value: number;
}

export interface IMetricStore extends IMetricBase {
  readonly timestamp: number;
}
