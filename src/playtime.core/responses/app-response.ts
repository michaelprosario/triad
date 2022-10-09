
export enum ResponseCode
{
 Ok = 200,
 NotFound = 404,
 Error = 500,
 BadRequest = 400
}

export class AppResponse
{
    code: ResponseCode = ResponseCode.Ok;
    validationErrors: Array<string> = [];
}