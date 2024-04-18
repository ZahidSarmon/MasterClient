export interface UserPage{
    pageId:number;
    pageName:string;
    pageIcon:string;
    pageUrl:string;
    parentId?:number;
    isParent:boolean;
    isActive:boolean;
    childs:UserPage[]
}

export interface UserPageGetResponse{
    result:UserPage[],
    errorMessage: any;
    timeGenerated: string;
}