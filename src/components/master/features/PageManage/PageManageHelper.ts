import _ from "lodash";
import { PageInput } from "../PageBuild/PageBuild.model";
import { FieldType } from "../../common/Master.model";

export const pageManageHelper = {
    isValidPageInput(pageInputs:PageInput[]){
        for(const pageInput of pageInputs){
            if(pageInput.fieldType == FieldType.CheckBox){
                if(pageInput.isRequired && !pageInput.checkBoxInput.models.some(x=>x.isChecked)){
                    return false;
                }
            }else{
                if(pageInput.isRequired && _.isEmpty(pageInput.value)){
                    return false;
                }
            }
        }
        return true;
    }
}