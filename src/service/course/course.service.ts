import { CourseRepository, UserRepository } from "../../repository";
import { ErrorResponse } from "../../utils/common";

const courseRepository = new CourseRepository();
const userRepository = new UserRepository();

async function createCourseService(data: any) {
  try {
    const userExists = await userRepository.findById(data.instructorId);
    if (!userExists) {
      throw new ErrorResponse("Instructor not found", {}, {});
    }
    const response = await courseRepository.create(data);
    return response;
  } catch (error) {
    throw new ErrorResponse(
      "Something went wrong while creating course",
      {},
      error,
    );
  }
}

async function getCoursesService(page:number,limit:number) {
  try {
    const response = await courseRepository.findCoursesWithInstructorDetails(page,limit);
    return response;
  } catch (error) {
    throw new ErrorResponse(
      "Something went wrong while fetching courses",
      {},
      error,
    );
  }
}

async function updateCourseService(userId: string, id: string, data: any) {
  try {
    const userExists = await userRepository.findById(userId);
    if (!userExists) {
      throw new ErrorResponse("Instructor not found", {}, {});
    }
    const course = await courseRepository.findById(id);
    if (course?.instructorId !== userId) {
      throw new ErrorResponse(
        "You are not authorized to update this course",
        {},
        {},
      );
    }
    const response = await courseRepository.update(id, data);
    return response;
  } catch (error) {
    throw new ErrorResponse(
      "Something went wrong while updating course",
      {},
      error,
    );
  }
}

async function deleteCourseService(userId: string, id: string) {
  try {
    const userExists = await userRepository.findById(userId);
    if (!userExists) {
      throw new ErrorResponse("Instructor not found", {}, {});
    }
    const course = await courseRepository.findById(id);
    if (course?.instructorId !== userId) {
      throw new ErrorResponse(
        "You are not authorized to delete this course",
        {},
        {},
      );
    }
    const response = await courseRepository.delete(id);
    return response;
  } catch (error) {
    throw new ErrorResponse(
      "Something went wrong while deleting course",
      {},
      error,
    );
  }
}

async function courseRevenueStatsService(courseId: string, userId: string) {
  try {
    const userExists = await userRepository.findById(userId);
    if (!userExists) {
      throw new ErrorResponse("Instructor not found", {}, {});
    }
     const course = await courseRepository.findById(courseId);
    if (course?.instructorId !== userId) {
      throw new ErrorResponse(
        "You are not authorized for checking revenue stats of this course",
        {},
        {},
      );
    }
    const response=await courseRepository.courseRevenueStats(courseId);
    return response
  } catch (error) {
    throw new ErrorResponse(
      "Something went wrong while fetching revenue",
      {},
      error,
    );
  }
}

export {
  createCourseService,
  getCoursesService,
  updateCourseService,
  deleteCourseService,
  courseRevenueStatsService,
};
