import { Lookup, Selective } from "../../common/Master.model";

export interface PageInput{
    id: string;
    title: string;
    databaseName:string;
    fieldType: string;
    dataType:string;
    varcharSize:string;
    decimalPlace:number;
    placeHolder:string;
    comboInput:ComboInput;
    radioInputs:Selective<string>[];
    checkBoxInputs:Selective<string>[];
    defaultDate:string;
    isRequired:boolean;
    ordinal:number;
}

export interface Page{
    id: string;
    name: string;
    databaseName:string;
    definition:string;
    isActive:boolean
}

export interface PageModel{
    id:string;
    name:string;
    databaseName:string;
}

export interface ComboInput{
    isDbSource:string;
    fixedValues:Lookup<string>[],
    tableRef:ComboInputTableRef;
}

export interface ComboInputTableRef{
    tableName:string;
    idColumn:string;
    nameColumn:string;
    whereClause:string;
}