import { BaseResponse } from "./common";


export interface LoginRequest {
    email: string,
    password: string,
}

export interface LoginResponse extends BaseResponse {
    data: DataLogin
}

type DataLogin = {
    uid: string,
    ak: string,
    fk: string,
}