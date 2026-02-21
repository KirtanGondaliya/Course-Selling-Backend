import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common";
import { courseRevenueStatsService, createCourseService } from "../service";
import type { Request, Response } from "express";
import {
  getCoursesService,
  updateCourseService,
  deleteCourseService,
} from "../service";

async function createCourse(req: Request, res: Response) {
  try {
    const response = await createCourseService(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(new SuccessResponse("Course created successfully", response, {}));
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(new ErrorResponse("Something went wrong", {}, error));
  }
}

async function getCourses(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const response = await getCoursesService(page, limit);
    return res
      .status(StatusCodes.OK)
      .json(new SuccessResponse("Courses fetched successfully", response, {}));
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(new ErrorResponse("Something went wrong", {}, error));
  }
}

async function updateCourse(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(new ErrorResponse("Course id is required", {}, {}));
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(new ErrorResponse("Course update details are required", {}, {}));
    }
    const response = await updateCourseService(
      req.user?.userId as string,
      id as string,
      req.body,
    );
    return res
      .status(StatusCodes.OK)
      .json(new SuccessResponse("Course updated successfully", response, {}));
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(new ErrorResponse("Something went wrong", {}, error));
  }
}

async function deleteCourse(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(new ErrorResponse("Course id is required", {}, {}));
    }
    const response = await deleteCourseService(
      req.user?.userId as string,
      id as string,
    );
    return res
      .status(StatusCodes.OK)
      .json(new SuccessResponse("Course deleted successfully", response, {}));
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(new ErrorResponse("Something went wrong", {}, error));
  }
}

async function courseRevenueStats(req: Request, res: Response) {
  try {
    const { courseId } = req.params;
    const userId = req.user?.userId;
    const response = await courseRevenueStatsService(
      courseId as string,
      userId as string,
    );
    return res
      .status(StatusCodes.OK)
      .json(new SuccessResponse("Revenue fetch successfully", response, {}));
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(new ErrorResponse("Somthing went wrong", {}, error));
  }
}

export {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  courseRevenueStats,
};
