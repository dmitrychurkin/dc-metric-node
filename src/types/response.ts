import { Response } from "express";
import { IMetricBase } from "./metric";

export type MetricAddResponse = Response<{}>;

export type MetricSumResponse = Response<IMetricBase>;
