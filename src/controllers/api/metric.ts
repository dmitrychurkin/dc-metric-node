import moment, { unitOfTime } from "moment";
import Record from "../../model/record/model";
import logger from "../../util/logger";
// import map from "../../util/in-memory-store";
// import filterStore from "../../util/filterStore";

import { MetricAddRequest, MetricSumRequest } from "../../types/request";
import { MetricAddResponse, MetricSumResponse } from "../../types/response";
// import { IMetricStore } from "../../types/metric";

/** POST /metric/{key}
 * @param Request req
 *  {
 *   "value": number
 *  }
 * @param Response res
 *  {}
 */
export const metricAdd = async (
  req: MetricAddRequest,
  res: MetricAddResponse
): Promise<void> => {
  const { key } = req.params;
  const { value } = req.body;

  if (typeof value === "number" && value > 0) {
    // const collection: Array<IMetricStore> = filterStore({
    //   collection: map.get(key),
    // });
    // collection.push({ timestamp: Date.now(), value: Math.round(value) });
    // map.set(key, collection);
    try {
      await Record.create({ key, value });
    } catch (err) {
      logger.error(err);
      res.sendStatus(500);
      return;
    }

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
export const metricSum = async (
  req: MetricSumRequest,
  res: MetricSumResponse
): Promise<void> => {
  const { TIME_WINDOW, TIME_UNIT } = process.env;
  const { key } = req.params;

  // let value = 0;

  // map.set(
  //   key,
  //   filterStore({
  //     collection: map.get(key),
  //     actionCallback: (record) => {
  //       value += record.value;
  //       return true;
  //     },
  //   })
  // );
  try {
    const value = await Record.aggregate([
      {
        $match: {
          key,
          createdAt: {
            $gte: moment()
              .subtract(TIME_WINDOW, TIME_UNIT as unitOfTime.Base)
              .toDate(),
          },
        },
      },
      {
        $group: {
          _id: "$key",
          valueTotal: { $sum: "$value" },
        },
      },
    ]).allowDiskUse(true);
    res.json({ value: value[0]?.valueTotal ?? 0 });
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
    return;
  }
};
