import { Router } from "express";

import * as api from "../controllers/api";

const router = Router();

/**
 * POST /metric/{key}
 */
router.post("/metric/:key", api.metricAdd);

/**
 * GET /metric/{key}/sum
 */

router.get("/metric/:key/sum", api.metricSum);

export default router;
