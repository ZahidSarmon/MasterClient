import { Lookup, Selective } from "../../common/Master.model";

export interface PageInput{
    id: string;
    title: string;
    databaseName:string;
    fieldType: string;
    dataType:string;
    size:string;
    decimalPlace:number;
    placeHolder:string;
    comboInput:ComboInput;
    radioInputs:Selective<string>[];
    checkBoxInputs:Selective<string>[];
    defaultDate:string;
    isRequired:boolean;
    ordinal:number;
    isMax:boolean;
    isUpdate:boolean;
    value:string;
}

export interface PageModel{
    id: string;
    name: string;
    databaseName:string;
    definition:string;
    isActive:boolean;
    isUpdate:false;
}

export interface ComboInput{
    isDataBaseSource:boolean;
    data:Lookup<string>[],
    tableRef:ComboInputTableRef;
}

export interface ComboInputTableRef{
    tableSchema:string;
    tableName:string;
    idColumn:string;
    nameColumn:string;
    whereClause:string;
}

export interface GetTableSchemaResponse{
    result:Lookup<string>[];
    errorMessage: any;
    timeGenerated: string;
}

export interface GetTableNameResponse{
    result:Lookup<string>[];
    errorMessage: any;
    timeGenerated: string;
}

export interface GetTableColumnResponse{
    result:Lookup<string>[];
    errorMessage: any;
    timeGenerated: string;
}

export interface GetPageResponse{
    result:Property;
    errorMessage: any;
    timeGenerated: string;
}

export interface Property{
    result:PageModel[];
    count:number;
}