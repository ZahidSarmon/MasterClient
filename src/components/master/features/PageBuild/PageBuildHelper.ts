import _ from "lodash";
import { DataType, FieldType } from "../../common/Master.model";
import { PageInput, PageModel } from "./PageBuild.model";

export const pageBuildHelper = {
    getInValidStatus(pageInput:PageInput){
        const isDropdown = (pageInput.fieldType == FieldType.DropDown 
            || pageInput.fieldType == FieldType.AutoComplete 
            || pageInput.fieldType == FieldType.MultiSelect);

        if(_.isEmpty(pageInput.title)){
            return "Title is required";
        }
        if(_.isEmpty(pageInput.fieldType)){
            return "Field Type is required";
        }

        if(pageInput.fieldType != FieldType.MultiSelect){
            if(_.isEmpty(pageInput.dataType)){
                return "Data Type is required";
            }

            if(pageInput.dataType == DataType.Varchar 
                || pageInput.dataType == DataType.Varbinary
                || pageInput.dataType == DataType.Char
                || pageInput.dataType == DataType.Binary)
            {
                if(_.isEmpty(pageInput.size)){
                    return "Size is required";
                }
                else if(pageInput.size != "max"){
                    const regex = /^(?:[0-7]?[0-9]{1,3}|8000)$/;
                    if(!regex.test(pageInput.size)){
                        return "Size isn't valid! Size must be between 0 and 8000";
                    }
                }
            }
    
            if(pageInput.dataType == DataType.Nchar
                || pageInput.dataType == DataType.Nvarchar
            ){
                if(_.isEmpty(pageInput.size)){
                    return "Size is required";
                }
                else if(pageInput.size != "max"){
                    const regex = /^(?:[0-7]?[0-9]{1,3}|4000)$/;
                    if(!regex.test(pageInput.size)){
                        return "Size isn't valid! Size must be between 0 and 4000";
                    }
                }
            }
    
            if(pageInput.dataType == DataType.Decimal
                || pageInput.dataType == DataType.Numeric
            ){
                if(pageInput.decimalPlace && pageInput.decimalPlace <=0){
                    return "Decimal place is required";
                }
                else if(pageInput.decimalPlace &&  pageInput.decimalPlace>0){
                    const regex = /^(?:[0-7]?[0-9]{1,3}|38)$/;
                    if(!regex.test(String(pageInput.decimalPlace))){
                        return "Decimal place isn't valid! Decimal place must be between 0 and 38";
                    }
                }
            }
    
            if(_.isEmpty(pageInput.databaseName)){
                return "Database Name is required";
            }else{
                const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
                if(!regex.test(pageInput.databaseName)){
                    return "Database Name must be alphanumeric and start with alphabet";
                }
            }
        }

        if(pageInput.comboInput.isDataBaseSource && isDropdown){
            if(_.isEmpty(pageInput.comboInput.tableRef.tableSchema)){
                return "Table Schema is required";
            }
            if(_.isEmpty(pageInput.comboInput.tableRef.tableName)){
                return "Table Name is required";
            }
            if(_.isEmpty(pageInput.comboInput.tableRef.idColumn)){
                return "Id Column is required";
            }
            if(_.isEmpty(pageInput.comboInput.tableRef.nameColumn)){
                return "Name Column is required";
            }

            if(pageInput.comboInput.tableRef.idColumn == pageInput.comboInput.tableRef.nameColumn){
                return "Id Column and Name Column must be different";
            }
        }

        if(!pageInput.comboInput.isDataBaseSource && isDropdown){
            if(pageInput.comboInput.data && pageInput.comboInput.data.length == 0){
                return "Dropdown data are required";
            }
        }
    },

    isValidForm(pageInput:PageInput){
        const isDropdown = (pageInput.fieldType == FieldType.DropDown 
            || pageInput.fieldType == FieldType.AutoComplete 
            || pageInput.fieldType == FieldType.MultiSelect);

        if(_.isEmpty(pageInput.title)){
            return false;
        }
        if(_.isEmpty(pageInput.fieldType)){
            return false;
        }
        
        if(pageInput.fieldType != FieldType.MultiSelect){
            if(_.isEmpty(pageInput.dataType)){
                return false;
            }
            if(pageInput.dataType == DataType.Varchar 
                || pageInput.dataType == DataType.Varbinary
                || pageInput.dataType == DataType.Char
                || pageInput.dataType == DataType.Binary)
            {
                if(_.isEmpty(pageInput.size)){
                    return false;
                }
                else if(pageInput.size != "max"){
                    const regex = /^(?:[0-7]?[0-9]{1,3}|8000)$/;
                    if(!regex.test(pageInput.size)){
                        return false;
                    }
                }
            }
    
            if(pageInput.dataType == DataType.Nchar
                || pageInput.dataType == DataType.Nvarchar
            ){
                if(_.isEmpty(pageInput.size)){
                    return false;
                }
                else if(pageInput.size != "max"){
                    const regex = /^(?:[0-7]?[0-9]{1,3}|4000)$/;
                    if(!regex.test(pageInput.size)){
                        return false;
                    }
                }
            }
    
            if(pageInput.dataType == DataType.Decimal
                || pageInput.dataType == DataType.Numeric
            ){
                if(pageInput.decimalPlace && pageInput.decimalPlace <=0){
                    return false;
                }
                else if(pageInput.decimalPlace &&  pageInput.decimalPlace>0){
                    const regex = /^(?:[0-7]?[0-9]{1,3}|38)$/;
                    if(!regex.test(String(pageInput.decimalPlace))){
                        return false;
                    }
                }
            }

            if(_.isEmpty(pageInput.databaseName)){
                return false;
            }else{
                const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
                if(!regex.test(pageInput.databaseName)){
                    return false;
                }
            }
        }

        if(pageInput.comboInput.isDataBaseSource && isDropdown){
            if(_.isEmpty(pageInput.comboInput.tableRef.tableSchema)){
                return false;
            }
            if(_.isEmpty(pageInput.comboInput.tableRef.tableName)){
                return false;
            }
            if(_.isEmpty(pageInput.comboInput.tableRef.idColumn)){
                return false;
            }
            if(_.isEmpty(pageInput.comboInput.tableRef.nameColumn)){
                return false;
            }
            if(pageInput.comboInput.tableRef.idColumn == pageInput.comboInput.tableRef.nameColumn){
                return false;
            }
        }

        if(!pageInput.comboInput.isDataBaseSource && isDropdown){
            if(pageInput.comboInput.data && pageInput.comboInput.data.length == 0){
                return false;
            }
        }

        return true;
    },
    getPageValidStatus(page:PageModel){
        if(_.isEmpty(page.name)){
            return "Name is required";
        }
        if(_.isEmpty(page.databaseName)){
            return "Database table name is required";
        }
        else{
            const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
            if(!regex.test(page.databaseName)){
                return "Database table name must be alphanumeric and start with alphabet"
            }
        }

        if(_.isEmpty(page.definition)){
            return "Definition is required";
        }
    },
    isValidPage(page:PageModel){
        if(_.isEmpty(page.name)){
            return false;
        }
        if(_.isEmpty(page.databaseName)){
            return false;
        }else{
            const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
            if(!regex.test(page.databaseName)){
                return false;
            }
        }
        if(_.isEmpty(page.definition)){
            return false;
        }
        return true;
    }
}