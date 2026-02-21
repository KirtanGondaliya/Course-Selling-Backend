import CrudRepository from "./crud.repository";
import { db } from "../config";

class CourseRepository extends CrudRepository {
  constructor() {
    super(db.course);
  }

  async findCoursesWithInstructorDetails(page: number, limit: number) {
    const [data, totalCourses] = await Promise.all([
      db.course.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          instructor: {
            select: {
              name: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      db.course.count(),
    ]);

    return {
      courses: data,
      totalCourses,
      page,
      limit,
      totalPages:Math.ceil(totalCourses/limit)
    };
  }

  async findCoursesWithLesson(courseId: string) {
    try {
      const response = await db.course.findUnique({
        where: {
          id: courseId,
        },
        include: {
          lessons: true,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async courseRevenueStats(courseId: string) {
    try {
      const response = await db.course.findUnique({
        where: {
          id: courseId,
        },
        select: {
          price: true,
          _count: {
            select: {
              purchases: true,
            },
          },
        },
      });
      const totalPurchases = response?._count.purchases ?? 0;
      const totalRevenue = totalPurchases * response?.price!;

      return {
        coursePrice: response?.price,
        totalPurchases,
        totalRevenue,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default CourseRepository;
