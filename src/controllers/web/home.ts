import { Request, Response } from "express";

/**
 * GET /
 * Starting point
 */
export const index = (req: Request, res: Response): void => {
  res.render("index", {
    title: "Home",
  });
};
