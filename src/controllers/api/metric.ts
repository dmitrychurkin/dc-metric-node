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
export const metricAdd = (req: MetricAddRequest, res: MetricAddResponse) => {
  const { key } = req.params;
  const collection: Array<IMetricStore> = map.get(key) ?? [];

  const { value } = req.body;
  if (value > 0) {
    collection.push({ timestamp: Date.now(), value: Math.round(value) });
    map.set(key, collection);
  }

  res.json({});
};

/** GET metric sum
 * @param Request req
 * @param Response res
 *  {
 *   "value": number
 *  }
 */
export const metricSum = (req: MetricSumRequest, res: MetricSumResponse) => {
  const { key } = req.params;
  const collection: Array<IMetricStore> = map.get(key) ?? [];

  // res.json({ metricSum: true }); TODO: implemenation pending
};
