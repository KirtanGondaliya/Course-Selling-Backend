import type { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/common";
import { StatusCodes } from "http-status-codes";
import { purchaseSchema } from "../validators";

function purchaseRequestValidate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const request = purchaseSchema.safeParse(req.body);
    if (!request.success) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          new ErrorResponse("Invalid request", {}, { error: request.error }),
        );
    }
    next();
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(new ErrorResponse("Something went wrong", {}, { error }));
  }
}

export {
    purchaseRequestValidate
}