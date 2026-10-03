import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export const validateParams = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid parameters",
        error: result.error.issues,
      });
    }

    //   console.log(typeof result.data)
    //   console.log(result.data)

    req.params = result.data as any;
    next();
  };
};

export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid parameters",
        error: result.error.issues,
      });
    }
    req.body = result.data;
    next();
  };
};
