import type { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/common";
import { StatusCodes } from "http-status-codes";
import { signUpSchema, loginSchema } from "../validators";
import { verifyToken } from "../service";
import { db } from "../config";

async function tokenVerfication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(new ErrorResponse("Unauthorized", {}, {}));
    }
    const user = verifyToken(token);
    if (user.role !== "INSTRUCTOR") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json(new ErrorResponse("Forbidden", {}, {}));
    }
    req.user=user;
    next();
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(new ErrorResponse("Something went wrong", {}, { error }));
  }
}

async function tokenVerficationForStudent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(new ErrorResponse("Unauthorized", {}, {}));
    }
    const user = verifyToken(token);
    if (user.role !== "STUDENT") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json(new ErrorResponse("Forbidden", {}, {}));
    }
    req.user=user;
    next();
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(new ErrorResponse("Something went wrong", {}, { error }));
  }
}

function authSignUpRequestValidate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const request = signUpSchema.safeParse(req.body);
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

function authLoginRequestValidate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const request = loginSchema.safeParse(req.body);
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
  authSignUpRequestValidate,
  authLoginRequestValidate,
  tokenVerfication,
  tokenVerficationForStudent
};
