import httpClient from "@/services/httpClient";
import { GetPageResponse, GetTableColumnResponse, GetTableSchemaResponse } from "./PageBuild.model";
import { DeleteResponse, PostResponse } from "../../common/Master.model";

export class PageBuildDataService{
    async postPageInputs(payload:any){
        return httpClient.post<PostResponse>(`Page/PostPageInputs`,payload);
    }

    async fetchPages(payload:any){
        return httpClient.post<GetPageResponse>(`Page/GetPages`,payload);
    }

    async deletePage(id:string){
        return httpClient.delete<DeleteResponse>(`Page/DeletePage?id=${id}`);
    }

    async fetchTableSchemas(){
        return await httpClient.get<GetTableSchemaResponse>(`Page/GetTableSchemas`);
    }

    async fetchTableNames(schema:string){
        return await httpClient.get<GetTableColumnResponse>(`Page/GetTableNames?schema=${schema}`);
    }

    async fetchTableColumns(schema:string, table:string){
        return await httpClient.get<GetTableColumnResponse>(`Page/GetTableColumns?schema=${schema}&table=${table}`);
    }
}