import { Lookup } from "../../common/Master.model";
import { PageInput } from "../PageBuild/PageBuild.model";

export interface PageModel{
    id:string;
    name:string;
    databaseName:string;
}

export interface ComboInput{
    data:Lookup<string>[];
    tableName:string;
    tableSchema:string;
}

export interface PostPageInputValueModel{
    id:string|null|undefined;
    tableName:string;
    columns:string[];
    columnWithValues:Map<string,string>;
    user:string;
    comboInputs:ComboInput[];
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

export interface GetPageInputByIdResponse{
    result:PageInput[];
    errorMessage: any;
    timeGenerated: string;

}

export interface GetPageLookupResponse{
    result:PageModel[];
    errorMessage: any;
    timeGenerated: string;
}