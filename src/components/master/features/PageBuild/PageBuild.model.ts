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
    radioInput:RadioInput;
    checkBoxInput:CheckBoxInput;
    defaultDate:string;
    isRequired:boolean;
    ordinal:number;
    isMax:boolean;
    isUpdate:boolean;
    value:string|null|undefined;
}

export interface PageModel{
    id: string;
    name: string;
    databaseName:string;
    definition:string;
    isActive:boolean;
    isUpdate:false;
}

export interface RadioInput{
    isDataBaseSource:boolean;
    data:string[];
    tableRef:DatabaseTableRef;
}

export interface CheckBoxInput{
    isDataBaseSource:boolean;
    data:Lookup<string>[];
    tableRef:DatabaseTableRef;
}

export interface ComboInput{
    isDataBaseSource:boolean;
    data:Lookup<string>[],
    tableRef:DatabaseTableRef;
}

export interface DatabaseTableRef{
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