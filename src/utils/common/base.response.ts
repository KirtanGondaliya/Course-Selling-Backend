class BaseResponse {
    success: boolean;
    message: string;
    data: object;
    error: object;
    constructor(success: boolean, message: string, data: object, error: object) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}

export default BaseResponse;