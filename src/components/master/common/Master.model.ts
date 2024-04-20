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
    Bigint = "bigint",
    Binary = "binary",
    Bit = "bit",
    Char = "char",
    Date = "date",
    DateTime = "datetime",
    DateTime2 = "datetime2",
    DateTimeOffset = "datetimeoffset",
    Decimal = "decimal",
    Float = "float",
    Geography = "geography",
    Geometry = "geometry",
    Guid = "uniqueidentifier",
    Hierarchyid = "hierarchyid",
    Image = "image",
    Int = "int",
    Money = "money",
    Nchar = "nchar",
    NText = "ntext",
    Numeric = "numeric",
    Nvarchar = "nvarchar",
    Real = "real",
    Smalldatetime = "smalldatetime",
    Smallint = "smallint",
    Smallmoney = "smallmoney",
    SqlVariant = "sql_variant",
    Text = "text",
    Time = "time",
    Timestamp = "timestamp",
    Tinyint = "tinyint",
    Varchar = "varchar",
    Varbinary = "varbinary",
    Xml = "xml"
}

export const fieldTypeLookup:Lookup<string>[] = [
    {id:FieldType.Text,name:"Text"},
    {id:FieldType.DropDown,name:"DropDown"},
    {id:FieldType.Date,name:"Date"},
    {id:FieldType.Number,name:"Number"},
    {id:FieldType.CheckBox,name:"CheckBox"},
    {id:FieldType.Radio,name:"Radio"},
    {id:FieldType.AutoComplete,name:"AutoComplete"},
    {id:FieldType.MultiSelect,name:"MultiSelect"}
];

export const dataTypeLookup:Lookup<string>[] = [
    {id:DataType.Bigint,name:"Bigint"},
    {id:DataType.Binary,name:"Binary"},
    {id:DataType.Bit,name:"Bit"},
    {id:DataType.Char,name:"Char"},
    {id:DataType.Date,name:"Date"},
    {id:DataType.DateTime,name:"DateTime"},
    {id:DataType.DateTime2,name:"DateTime2"},
    {id:DataType.DateTimeOffset,name:"DateTimeOffset"},
    {id:DataType.Decimal,name:"Decimal"},
    {id:DataType.Float,name:"Float"},
    {id:DataType.Geography,name:"Geography"},
    {id:DataType.Geometry,name:"Geometry"},
    {id:DataType.Guid,name:"Guid"},
    {id:DataType.Hierarchyid,name:"Hierarchyid"},
    {id:DataType.Image,name:"Image"},
    {id:DataType.Int,name:"Int"},
    {id:DataType.Money,name:"Money"},
    {id:DataType.Nchar,name:"Nchar"},
    {id:DataType.NText,name:"NText"},
    {id:DataType.Numeric,name:"Numeric"},
    {id:DataType.Nvarchar,name:"Nvarchar"},
    {id:DataType.Real,name:"Real"},
    {id:DataType.Smalldatetime,name:"Smalldatetime"},
    {id:DataType.Smallint,name:"Smallint"},
    {id:DataType.Smallmoney,name:"Smallmoney"},
    {id:DataType.SqlVariant,name:"SqlVariant"},
    {id:DataType.Text,name:"Text"},
    {id:DataType.Time,name:"Time"},
    {id:DataType.Timestamp,name:"Timestamp"},
    {id:DataType.Tinyint,name:"Tinyint"},
    {id:DataType.Varchar,name:"Varchar"},
    {id:DataType.Varbinary,name:"Varbinary"},
    {id:DataType.Xml,name:"Xml"}
];