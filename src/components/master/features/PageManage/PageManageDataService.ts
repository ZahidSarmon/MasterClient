import httpClient from "@/services/httpClient";
import { GetPageInputResponse, GetPageInputValueResponse, GetPageResponse } from "./PageManageModel";
import { PostResponse, PutResponse } from "../../common/Master.model";

export class PageManageDataService{

    async GetPageInputValues(id:string){
        return await httpClient.get<GetPageInputValueResponse>(`Page/GetPageInputValues?id=${id}`);
    }

    async GetPages(){
        return await httpClient.get<GetPageResponse>(`Page`);
    }

    async GetPageInputs(id:string){
        return await httpClient.get<GetPageInputResponse>(`Page/GetPageInputs?id=${id}`);
    }

    async PutPageInputValues(tableName:string,columns:string[],columnWithValues:Map<string,string>,modifiedBy:string){
        const payload = {
            tableName:tableName,
            columns:columns,
            columnWithValues:Object.fromEntries(columnWithValues),
            modifiedBy:modifiedBy,
        }
        return await httpClient.put<PutResponse>(`Page/PutPageInputValues`,payload);
    }

    async PostPageInputValues(tableName:string,columns:string[],columnWithValues:Map<string,string>,createdBy:string){
        const payload = {
            tableName:tableName,
            columns:columns,
            columnWithValues:Object.fromEntries(columnWithValues),
            createdBy:createdBy,
        }
        return await httpClient.post<PostResponse>(`Page/PostPageInputValues`,payload);
    }
}