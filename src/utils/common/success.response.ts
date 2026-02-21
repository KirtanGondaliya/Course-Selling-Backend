import BaseResponse from "./base.response";

class SuccessResponse extends BaseResponse{
    constructor(message:string,data:any,error:any){
        super(true,message,data,error);
    }
}

export default SuccessResponse;