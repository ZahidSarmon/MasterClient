import { LoginDTO } from "@/services/models/login";

export interface Login{
    email:string;
    password:string;
}

export interface LoginResponse{
    result:LoginDTO,
    errorMessage: any;
    timeGenerated: string;
}