import { defineComponent } from 'vue';
import { Page, PageInput} from './PageBuild.model';
import modal from '@/components/common/modalManage';
import _ from 'lodash';
import toasterService from '@/services/toasterService';
import httpClient from '@/services/httpClient';
import { helperUtility } from '@/services/helperUtility';
import moment from 'moment';
import { DataType, FieldType, Lookup, PostResponse, dataTypeLookup, fieldTypeLookup } from '../../common/Master.model';
import { DropDownListComponent } from "@syncfusion/ej2-vue-dropdowns";
import { CheckBoxComponent } from "@syncfusion/ej2-vue-buttons";
import { DatePickerComponent } from "@syncfusion/ej2-vue-calendars";
import { DateTimePickerComponent } from "@syncfusion/ej2-vue-calendars";
import { pageBuildHelper } from './PageBuildHelper';

export default defineComponent({
    name: 'PageBuildComponent',
    components:{
        'ejs-dropdownlist' : DropDownListComponent,
        "ejs-checkbox": CheckBoxComponent,
        'ejs-datepicker' : DatePickerComponent,
        'ejs-datetimepicker' : DateTimePickerComponent,
    },
    mounted(){
       
    },
    data() {
        return{
            fieldType:{
                data:fieldTypeLookup,
                model:FieldType,
                fields: { text: 'name', value: 'id' },
            },
            dataType:{
                data:dataTypeLookup,
                model:DataType,
                fields: { text: 'name', value: 'id' },
            },
            form: {} as Page,
            pageInputs:[] as PageInput[],
            pageInput:{} as PageInput,

        }
    },
    computed:{
        getCurrentDate(){
            return helperUtility.getCurrentDate();
        },
        getDateFormat(){
            return helperUtility.getDateFormat();
        },
    },
    methods:{
        addField(){
            if(!pageBuildHelper.isValidForm(this.pageInput)){
                toasterService.error(pageBuildHelper.getInValidStatus(this.pageInput)!);
                return;
            }
            this.close('inputModal');
            this.pageInput.id = helperUtility.getGUID();
            this.pageInput.databaseName = this.pageInput.databaseName.replaceAll(" ","_");
            this.pageInputs.push(this.pageInput);
        },
        removeField(id:string){
            this.pageInputs = this.pageInputs.filter(item => item.id !== id);
        },
        async createForm(){
            this.form.definition = JSON.stringify(this.pageInputs);
            this.form.databaseName = this.form.databaseName.replaceAll(" ","_");
            const payload = {
                ...this.form
            }

           console.log("payload: ",payload);
            const response = await httpClient.post<PostResponse>(`Page`,payload);
            if(response){
                this.pageInputs=[];
                toasterService.success('Form Created Successfully');
            }
        },
        fieldTypeChange(fieldType:string){
            // if(this.fieldType.Text==fieldType){
            //     this.pageInput.dataType = this.dataType.Varchar;
            // }
            // if(this.fieldType.Number==fieldType){
            //     this.pageInput.dataType = this.dataType.Int;
            // }
        },
        isMaxClick(){
            this.pageInput.size = "";
            if(this.pageInput.isMax){
                this.pageInput.size = "max";
            }
        },
        hasMax(){
            return this.pageInput.dataType == DataType.Varchar 
            || this.pageInput.dataType == DataType.Nvarchar 
            || this.pageInput.dataType == DataType.Varbinary; 
        },
        hasSize(){
            return this.pageInput.dataType == DataType.Varchar 
            || this.pageInput.dataType == DataType.Nvarchar 
            || this.pageInput.dataType == DataType.Varbinary
            || this.pageInput.dataType == DataType.Binary
            || this.pageInput.dataType == DataType.Char
            || this.pageInput.dataType == DataType.Nchar;
        },
        open(id:string){
            this.pageInput = {
                fieldType:this.fieldType.model.Text,
                dataType:this.dataType.model.Varchar,
            } as PageInput;
            modal.Open(id);
        },
        close(id:string){
            modal.Close(id);
        }
    }
});