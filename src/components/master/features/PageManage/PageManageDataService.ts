import httpClient from "@/services/httpClient";
import { GetPageInputByIdResponse, GetPageInputResponse, GetPageInputValueResponse, GetPageLookupResponse, PostPageInputValueModel } from "./PageManageModel";
import { DeleteResponse, PostResponse, PutResponse } from "../../common/Master.model";

export class PageManageDataService{

    async fetchPageInputValues(id:string){
        return await httpClient.get<GetPageInputValueResponse>(`Page/GetPageInputValues?id=${id}`);
    }

    async fetchPageInputValue(pageId:string,pageTableId:string){
        return await httpClient.get<GetPageInputByIdResponse>(`Page/GetPageInputValue?pageId=${pageId}&pageTableId=${pageTableId}`);
    }

    async fetchLookupPages(){
        return await httpClient.get<GetPageLookupResponse>(`Page/GetLookupPages`);
    }

    async GetPageInputs(id:string){
        return await httpClient.get<GetPageInputResponse>(`Page/GetPageInputs?id=${id}`);
    }

    async PostPageInputValues(postPayload:PostPageInputValueModel){
        const payload = {
            id:postPayload.id,
            tableName:postPayload.tableName,
            columns:postPayload.columns,
            columnWithValues:Object.fromEntries(postPayload.columnWithValues),
            user:postPayload.user,
            comboInputs:postPayload.comboInputs,
        }
        return await httpClient.post<PostResponse>(`Page/PostPageInputValues`,payload);
    }

    async deletePageInputValue(id:string,tableName:string){
        const payload = {
            tableName:tableName,
            id:id
        }
        return await httpClient.delete<DeleteResponse>(`Page/DeletePageInputValues`,payload);
    }
}