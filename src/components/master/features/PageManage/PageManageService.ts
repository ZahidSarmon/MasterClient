import { defineComponent } from 'vue';
import _ from 'lodash';
import toasterService from '@/services/toasterService';
import httpClient from '@/services/httpClient';
import {PageInputModel, PageModel} from './PageManageModel';
import { DeleteResponse, Lookup } from '../../common/Master.model';
import { PageManageDataService } from './PageManageDataService';
import { DialogUtility } from '@syncfusion/ej2-vue-popups';
import { DropDownListComponent } from "@syncfusion/ej2-vue-dropdowns";

let Confirmation: any = undefined;

export default defineComponent({
    name: 'PageManageComponent',
    components:{
        'ejs-dropdownlist' : DropDownListComponent,
    },
    data() {
        return{
            dataService:{} as PageManageDataService,
            pageInputs:[] as PageInputModel[],
            pageModel:{} as PageModel,
            pageInputValue:{
                columns:[] as string[],
                data:[] as any[]
            },
            page:{
                value:"",
                data:[] as Lookup<string>[],
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
    methods:{
        async loadPageInputs(id:string){
            const response = await this.dataService.GetPageInputs(id);
            if(response && response.result){
                this.pageInputs = response.result;
            }
        },
        async loadPages(){
            const response = await this.dataService.GetPages();
            if(response && response.result){
                this.page.data = response.result;
            }
        },
        async loadPageInputValue(id:string){
            const response = await this.dataService.GetPageInputValues(id);
            if(response && response.result){
                const result = response.result;
                this.pageInputValue.columns = this.getColumns(result.columnString);
                this.pageInputValue.data = JSON.parse(result.valueString);
                this.resetPageInput();
            }
        },
        async savePageInputValues(){
            const fieldNames = this.pageInputs.map(item => item.databaseName);
            const queryValues = new Map<string,string>();
            if(this.isUpdate){
                for(const pageInput of _.cloneDeep(this.pageInputs)){
                    queryValues.set(pageInput.databaseName,String(pageInput.value));
                }
                queryValues.set('Id',_.cloneDeep(this.pageInputs).shift()!.id);

                const response = await this.dataService.PutPageInputValues(this.pageModel.databaseName,fieldNames,queryValues,this.user);

                if(response && response.result){
                    toasterService.success('Data Updated Successfully');
                }
            }else{
                for(const pageInput of _.cloneDeep(this.pageInputs)){
                    queryValues.set(pageInput.databaseName,String(pageInput.value));
                }

                const response = await this.dataService.PostPageInputValues(this.pageModel.databaseName,fieldNames,queryValues,this.user);
                if(response){
                    toasterService.success('Data Saved Successfully');
                }
            }

            this.loadPageInputValue(this.pageModel.id);
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
                        app.loadPageInputValue(app.pageModel.id);
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
            this.deletePageInputValues(String(id),this.pageModel.databaseName);
        },
        pageChange(){
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
            this.pageInputs.forEach(item=>{
                item.value = '';
            });
            this.isUpdate = false;
        }
    }
});