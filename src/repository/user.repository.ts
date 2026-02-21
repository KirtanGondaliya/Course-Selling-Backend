import CrudRepository from "./crud.repository";
import {db} from "../config";

class UserRepository extends CrudRepository{
    constructor(){
        super(db.user)
    }

    async findByEmail(email:string){
        return await db.user.findUnique({
            where:{email}
        })
    }
    async findPurchaseDetails(userId:string){
            try{
                const response = await db.user.findUnique({
                    where:{
                        id:userId,
                    },
                    select:{
                        name:true,
                        email:true,
                        purchases:{
                            select:{
                                course:{
                                    select:{
                                        id:true,
                                        title:true,
                                        description:true,
                                        price:true,
                                        instructor:{
                                            select:{
                                                name:true,
                                                email:true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
                return response
            }catch(error){
                throw error
            }
        }
}

export default UserRepository
