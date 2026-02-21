import { db } from "../../config";
import { UserRepository } from "../../repository";
import { ErrorResponse } from "../../utils/common";

type User={id:string}

const userRepository=new UserRepository()

async function createPurchaseService(user: User, courseId: string) {
  try {
    return await db.$transaction(async (tx: any) => {

      const userExists = await tx.user.findUnique({
        where: { id: user.id }
      });

      if (!userExists) {
        throw new ErrorResponse("User not found", {}, {});
      }

      const courseExists = await tx.course.findUnique({
        where: { id: courseId }
      });

      if (!courseExists) {
        throw new ErrorResponse("Course not found", {}, {});
      }

      const alreadyPurchased = await tx.purchase.findFirst({
        where: {
          userId: user.id,
          courseId: courseId
        }
      });

      if (alreadyPurchased) {
        throw new ErrorResponse("Course already purchased", {}, {});
      }


      const purchase = await tx.purchase.create({
        data: {
          userId: user.id,
          courseId: courseId
        }
      });

      return purchase;
    });

  } catch (error) {
    throw new ErrorResponse(
      "Something went wrong while purchasing the course",
      {},
      error
    );
  }
}

async function getAllPurchaseCourseService(userId:string){
    try{
        const cousePurchase=await userRepository.findPurchaseDetails(userId)
        return cousePurchase
    }catch(error){
        throw new ErrorResponse(
            "Something went wrong while fetching purchase course",
            {},
            error
        )
    }
}

export {
    createPurchaseService,
    getAllPurchaseCourseService
}
