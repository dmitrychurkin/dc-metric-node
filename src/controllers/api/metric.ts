import moment, { unitOfTime } from "moment";

import map from "../../util/in-memory-store";

import { MetricAddRequest, MetricSumRequest } from "../../types/request";
import { MetricAddResponse, MetricSumResponse } from "../../types/response";
import { IMetricStore } from "../../types/metric";

/** POST /metric/{key}
 * @param Request req
 *  {
 *   "value": number
 *  }
 * @param Response res
 *  {}
 */
export const metricAdd = (
  req: MetricAddRequest,
  res: MetricAddResponse
): void => {
  const { key } = req.params;
  const { value } = req.body;

  if (typeof value === "number" && value > 0) {
    const collection: Array<IMetricStore> = map.get(key) ?? [];
    collection.push({ timestamp: Date.now(), value: Math.round(value) });
    map.set(key, collection);

    res.json({});
    return;
  }

  res.sendStatus(400);
};

/** GET metric sum
 * @param Request req
 * @param Response res
 *  {
 *   "value": number
 *  }
 */
export const metricSum = (
  req: MetricSumRequest,
  res: MetricSumResponse
): void => {
  const { key } = req.params;
  const timeUnit = (process.env.TIME_UNIT || "hours") as unitOfTime.Diff;
  const timeWindow = process.env.TIME_WINDOW || 1;
  let value = 0;

  const collection = (map.get(key) ?? []).filter((record) => {
    if (
      moment(Date.now()).diff(moment(record.timestamp), timeUnit) > timeWindow
    ) {
      return false;
    }
    value += record.value;
    return true;
  });

  map.set(key, collection);

  res.json({ value });
};
