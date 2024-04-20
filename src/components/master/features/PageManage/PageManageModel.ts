export interface PageModel{
    id:string;
    name:string;
    databaseName:string;
}

export interface PageInputModel{
    id:string;
    title: string;
    databaseName:string;
    fieldType: string;
    placeHolder:string;
    value:string;
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
    result:PageInputModel[];
    errorMessage: any;
    timeGenerated: string;
}

export interface GetPageResponse{
    result:PageModel[];
    errorMessage: any;
    timeGenerated: string;
}