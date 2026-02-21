import BaseResponse from "./base.response";

class ErrorResponse extends BaseResponse{
    constructor(message:string,data:object={},error:any){
        super(false,message,data,error);
    }
}

export default ErrorResponse;