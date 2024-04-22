import httpClient from "@/services/httpClient";
import { GetTableColumnResponse, GetTableSchemaResponse } from "./PageBuild.model";

export class PageBuildDataService{
    async PostPageInputs(){
        
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