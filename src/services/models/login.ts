export interface LoginDTO{
    id:number;
    name:string;
    email:string;
    token:string;
    modules:ModuleDTO[];
    moduleBaseUrl:ModuleBaseUrl;
    isHost:boolean;
    organizationName:string;
}

export interface ModuleDTO{
    id:number;
    name:string;
}

export interface ModuleBaseUrl{
    fortnox:string;
    resultSheet:string;
}