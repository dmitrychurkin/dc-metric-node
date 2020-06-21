import moment, { unitOfTime } from "moment";

import { IMetricStore } from "../types/metric";

export default ({
  collection = [],
  unit = (process.env.TIME_UNIT || "hours") as unitOfTime.Diff,
  window = Number.parseFloat(`${process.env.TIME_WINDOW}`) || 1,
  actionCallback,
  onExpired,
}: FilterFnConfigArgs<IMetricStore>): Array<IMetricStore> =>
  collection.filter((record) => {
    if (moment(Date.now()).diff(moment(record.timestamp), unit) > window) {
      return typeof onExpired === "function" && onExpired(record);
    }

    return typeof actionCallback === "function" ? actionCallback(record) : true;
  });

export type FilterFnConfigArgs<T> = {
  readonly collection?: Array<T>;
  readonly unit?: unitOfTime.Diff;
  readonly window?: number;
  readonly actionCallback?: (record: T) => boolean;
  readonly onExpired?: (record: T) => boolean;
};
