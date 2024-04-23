import httpClient from "@/services/httpClient";
import { GetPageInputResponse, GetPageInputValueResponse, GetPageLookupResponse, PostPageInputValueModel, PutPageInputValueModel } from "./PageManageModel";
import { PostResponse, PutResponse } from "../../common/Master.model";

export class PageManageDataService{

    async fetchPageInputValues(id:string){
        return await httpClient.get<GetPageInputValueResponse>(`Page/GetPageInputValues?id=${id}`);
    }

    async fetchLookupPages(){
        return await httpClient.get<GetPageLookupResponse>(`Page/GetLookupPages`);
    }

    async GetPageInputs(id:string){
        return await httpClient.get<GetPageInputResponse>(`Page/GetPageInputs?id=${id}`);
    }

    async PutPageInputValues(putPayload:PutPageInputValueModel){
        const payload = {
            tableName:putPayload.tableName,
            columns:putPayload.columns,
            columnWithValues:Object.fromEntries(putPayload.columnWithValues),
            modifiedBy:putPayload.modifiedBy,
            comboInputs:putPayload.comboInputs,
        }
        return await httpClient.put<PutResponse>(`Page/PutPageInputValues`,payload);
    }

    async PostPageInputValues(postPayload:PostPageInputValueModel){
        const payload = {
            tableName:postPayload.tableName,
            columns:postPayload.columns,
            columnWithValues:Object.fromEntries(postPayload.columnWithValues),
            createdBy:postPayload.createdBy,
            comboInputs:postPayload.comboInputs,
        }
        return await httpClient.post<PostResponse>(`Page/PostPageInputValues`,payload);
    }
}