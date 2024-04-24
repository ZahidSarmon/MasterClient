import httpClient from "@/services/httpClient";
import { GetPageInputResponse, GetPageInputValueResponse, GetPageLookupResponse, PostPageInputValueModel } from "./PageManageModel";
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
}