import { defineComponent } from 'vue';
import _ from 'lodash';
import toasterService from '@/services/toasterService';
import httpClient from '@/services/httpClient';
import {ComboInput, PageModel, PostPageInputValueModel} from './PageManageModel';
import { DeleteResponse, FieldType } from '../../common/Master.model';
import { PageManageDataService } from './PageManageDataService';
import { DialogUtility } from '@syncfusion/ej2-vue-popups';

import { DropDownListComponent,MultiSelectComponent,AutoCompleteComponent  } from "@syncfusion/ej2-vue-dropdowns";
import { CheckBoxComponent,RadioButtonComponent } from "@syncfusion/ej2-vue-buttons";
import { DatePickerComponent } from "@syncfusion/ej2-vue-calendars";
import { DateTimePickerComponent } from "@syncfusion/ej2-vue-calendars";
import { helperUtility } from '@/services/helperUtility';
import { PageInput } from '../PageBuild/PageBuild.model';

let Confirmation: any = undefined;

export default defineComponent({
    name: 'PageManageComponent',
    components:{
        "ejs-checkbox": CheckBoxComponent,
        'ejs-datepicker' : DatePickerComponent,
        'ejs-datetimepicker' : DateTimePickerComponent,
        'ejs-dropdownlist' : DropDownListComponent,
        'ejs-multiselect' : MultiSelectComponent,
        'ejs-autocomplete' : AutoCompleteComponent,
        "ejs-radiobutton": RadioButtonComponent,
    },
    data() {
        return{
            helperUtility:helperUtility,
            dataService:{} as PageManageDataService,
            pageInputs:[] as PageInput[],
            pageInputValue:{
                columns:[] as string[],
                data:[] as any[]
            },
            page:{
                value:"",
                model:{} as PageModel,
                data:[] as PageModel[],
                fields: { text: 'name', value: 'id' },
            },
            comboData:{
                fields: { text: 'name', value: 'id' },
            },
            user:"admin@mail.com",
            isUpdate:false
        }
    },
    created() {
        this.dataService = new PageManageDataService();
    },
    mounted(){
        this.loadPages();
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
        async loadPageInputs(id:string){
            const response = await this.dataService.GetPageInputs(id);
            this.pageInputs = [] as PageInput[];
            if(response && response.result){
                this.pageInputs = response.result;
                console.log("response.result:",response.result);
            }
        },
        async loadPages(){
            this.dataService.fetchLookupPages().then(response=>{
                if(response && response.result){
                    this.page.data = response.result;
                }
            });
        },
        async loadPageInputValue(id:string){
            const response = await this.dataService.fetchPageInputValues(id);
            if(response && response.result){
                const result = response.result;
                this.pageInputValue.columns = this.getColumns(result.columnString);
                this.pageInputValue.data = JSON.parse(result.valueString);
            }
        },
        async savePageInputValues(){
            const fieldNames = this.pageInputs.map(item => item.databaseName);
            const queryValues = new Map<string,string>();
            let id = null;
            if(this.isUpdate){
                id = _.cloneDeep(this.pageInputs).shift()!.id;
            }

            console.log("pageInputs:",this.pageInputs);

            // const comboInputs = [] as ComboInput[];
            // for(const pageInput of _.cloneDeep(this.pageInputs)){
            //     queryValues.set(pageInput.databaseName,String(pageInput.value));
            //     if(pageInput.fieldType == FieldType.MultiSelect){
            //         comboInputs.push({
            //             data:pageInput.comboInput.data,
            //             tableName:pageInput.comboInput.tableRef.tableName,
            //             tableSchema:pageInput.comboInput.tableRef.tableSchema
            //         });
            //     }
            // }
            
            // if(id) queryValues.set('Id',id);

            // const payload = {
            //     id:id,
            //     columns:fieldNames,
            //     columnWithValues:queryValues,
            //     tableName:this.page.model.databaseName,
            //     user:this.user,
            //     comboInputs:comboInputs
            // } as PostPageInputValueModel;

            // this.dataService.PostPageInputValues(payload)
            // .then(response=>{
            //     if(response && response.result){
            //         this.loadPageInputValue(this.page.model.id);
            //         toasterService.success('Data Save/Updated Successfully');
            //     }
            // });
        },  
        async deletePageInputValues(id:string,tableName:string){
            const app = this;
            Confirmation = DialogUtility.confirm({
                title: this.$t("Delete Confirmation"),
                content: this.$t("Are you sure you want to delete this record?"),
                okButton: {
                  text: this.$t("ok"),
                  click: async function () {
                    Confirmation.hide();
                    const payload = {
                        tableName:tableName,
                        id:id
                    }
                    const response = await httpClient.delete<DeleteResponse>(`Page/DeletePageInputValues`,payload);
                    if(response && response.result){
                        app.loadPageInputValue(app.page.model.id);
                        toasterService.success('Data Deleted Successfully');
                    }
                  },
                },
                cancelButton: { text: this.$t("cancel") },
                showCloseIcon: true,
                closeOnEscape: true,
                zIndex: 10000,
                animationSettings: { effect: "Zoom" },
              });
        },
        editPageInput(item:any){
            const keyValueList = Object.entries(item);
            const id = Object.values(item).shift();
            _.map(this.pageInputs,item=>{
                item.id = String(id);
                const key = item.databaseName;
                const value = keyValueList.find(x=>x[0]==key);
                if(value){
                    item.value = String(value[1]);
                    this.isUpdate = true;
                }
            });
        },
        deletePageInput(item:any){
            const id = Object.values(item).shift();
            this.deletePageInputValues(String(id),this.page.model.databaseName);
        },
        pageChange(){
            this.page.model = this.page.data.find(x=>x.id == this.page.value)! as PageModel;
            this.loadPageInputs(this.page.value);
            this.loadPageInputValue(this.page.value);
        },
        getColumns(columnString:string){
            if(!columnString) return [] as string[];

            if(columnString && columnString.includes(',')){
                return columnString.split(',');
            }
            return [columnString];
        },
        populateTable(){
            const tableBody = document.getElementById("dataTable")!.getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear existing rows

            this.pageInputValue.data.forEach(function(rowData) {
                const row = document.createElement('tr');

                Object.values(rowData).forEach(function(value:any) {
                    const cell = document.createElement('td');
                    cell.textContent = value;
                    row.appendChild(cell);
                });

                tableBody.appendChild(row);
            });
        },
        resetPageInput(){
            // const pageInputs = _.cloneDeep(this.pageInputs);
            // pageInputs.forEach(item=>{
            //     item.value = null;
            // });
            this.pageInputs = [] as PageInput[];
            this.isUpdate = false;
        },
    }
});