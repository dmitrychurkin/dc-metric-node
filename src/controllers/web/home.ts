import { Request, Response } from "express";

/**
 * GET /
 * Starting point
 */
export const index = (req: Request, res: Response) => {
  res.render("index", {
    title: "Welcome",
  });
};
