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

export interface PageInputModel{
    id:string;
    title: string;
    databaseName:string;
    fieldType: string;
    placeHolder:string;
}

export enum FieldType{
    Text = "text",
    DropDown = "dropdown",
    Date = "date",
    Number = "number",
    CheckBox = "checkbox",
    Radio = "radio",
    AutoComplete = "autocomplete",
    MultiSelect = "multiselect"
}

export enum DataType{
    Varchar = "varchar",
    Int = "int",
    Bigint = "bigint",
    Guid = "uniqueidentifier",
    Bit = "bit",
    Money = "money",
    Float = "float",
    Date = "date",
    DateTime = "datetime",
    Nvarchar = "nvarchar",
    Decimal = "decimal"
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

export interface Page{
    id: string;
    name: string;
    databaseName:string;
    definition:string;
    isActive:boolean
}

export interface PostResponse{
    result:boolean;
    errorMessage: any;
    timeGenerated: string;
}

export interface GetPageInputResponse{
    result:PageInputModel[];
    errorMessage: any;
    timeGenerated: string;
}

export interface GetPageResponse{
    result:Lookup<string>[];
    errorMessage: any;
    timeGenerated: string;
}

export interface Lookup<T>{
    id:T;
    name:string;
}

export interface Selective<T>{
    id:T;
    name:string;
    isChecked:boolean;
}