import { Router } from "express";

import * as web from "../controllers/web";

const router = Router();

/* GET home page. */
router.get("/", web.index);

export default router;
