import { PageInput } from "../PageBuild/PageBuild.model";

export interface PageModel{
    id:string;
    name:string;
    databaseName:string;
}

export interface PageInputValueModel{
    columnString:string;
    valueString:string;
}

export interface GetPageInputValueResponse{
    result:PageInputValueModel;
    errorMessage: any;
    timeGenerated: string;
}

export interface GetPageInputResponse{
    result:PageInput[];
    errorMessage: any;
    timeGenerated: string;
}

export interface GetPageResponse{
    result:PageModel[];
    errorMessage: any;
    timeGenerated: string;
}