export interface Lookup<T>{
    id:T;
    name:string;
}

export interface Selective<T>{
    id:T;
    name:string;
    isChecked:boolean;
}

export interface PostResponse{
    result:boolean;
    errorMessage: any;
    timeGenerated: string;
}

export interface DeleteResponse{
    result:boolean;
    errorMessage: any;
    timeGenerated: string;
}

export interface PutResponse{
    result:boolean;
    errorMessage: any;
    timeGenerated: string;
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