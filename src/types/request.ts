import { Request } from "express";
import { MetricAddResponse, MetricSumResponse } from "./response";
import { IMetricBase } from "./metric";

type MetricRequestParams = { key: string };

export type MetricAddRequest = Request<
  MetricRequestParams,
  MetricAddResponse,
  IMetricBase
>;

export type MetricSumRequest = Request<MetricRequestParams, MetricSumResponse>;
