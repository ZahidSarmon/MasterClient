import { defineComponent } from 'vue';
import _ from 'lodash';
import toasterService from '@/services/toasterService';
import httpClient from '@/services/httpClient';
import {ComboInput, PageModel, PostPageInputValueModel} from './PageManageModel';
import { DeleteResponse, FieldType, Lookup } from '../../common/Master.model';
import { PageManageDataService } from './PageManageDataService';
import { DialogUtility } from '@syncfusion/ej2-vue-popups';

import { DropDownListComponent,MultiSelectComponent,AutoCompleteComponent  } from "@syncfusion/ej2-vue-dropdowns";
import { CheckBoxComponent,RadioButtonComponent } from "@syncfusion/ej2-vue-buttons";
import { DatePickerComponent } from "@syncfusion/ej2-vue-calendars";
import { DateTimePickerComponent } from "@syncfusion/ej2-vue-calendars";
import { helperUtility } from '@/services/helperUtility';
import { PageInput } from '../PageBuild/PageBuild.model';
import { pageManageHelper } from './PageManageHelper';

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
                id:"",
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
                _.map(this.pageInputs,item=>{
                    item.checkBoxInput.models = _.map(item.checkBoxInput.data,(x:string)=>({id:x,name:x,isChecked:false}));
                });
                console.log("loadPageInputs response.result:",response.result);
                console.log("loadPageInputs pageInputs:",this.pageInputs);
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
            this.resetPageInput();
            const response = await this.dataService.fetchPageInputValues(id);
            if(response && response.result){
                const result = response.result;
                this.pageInputValue.columns = this.getColumns(result.columnString);
                this.pageInputValue.data = JSON.parse(result.valueString);
            }
        },
        async savePageInputValues(){
            if(!pageManageHelper.isValidPageInput(this.pageInputs)){
                toasterService.error(`Please fill all required fields`);
                return;
            }   

            const fieldNames = this.pageInputs.map(item => item.databaseName);
            const queryValues = new Map<string,string>();
            let id = null;
            if(this.isUpdate){
                id = this.page.id;
            }

            const comboInputs = [] as ComboInput[];
            for(const pageInput of _.cloneDeep(this.pageInputs)){
                if(pageInput.fieldType == FieldType.MultiSelect){
                    const data:Lookup<string>[] = [];
                    if(pageInput.comboInput.isDataBaseSource){
                        _.map(pageInput.value,item=>{
                            _.map(pageInput.comboInput.data,existItem=>{
                                if(item == existItem.id){
                                    data.push(existItem);
                                }
                            })
                        })
                    }else{
                        _.map(pageInput.value,item=>{
                            data.push({id:item,name:item});
                        })
                    }
                    comboInputs.push({
                        data:data,
                        tableName:pageInput.comboInput.tableRef.tableName,
                        tableSchema:pageInput.comboInput.tableRef.tableSchema
                    });
                }

                if(pageInput.fieldType == FieldType.CheckBox){
                    const values = pageInput.checkBoxInput.models.filter(x=>x.isChecked).map(x=>x.name);
                    queryValues.set(pageInput.databaseName,values.join(','));
                }else{
                    queryValues.set(pageInput.databaseName,String(pageInput.value));
                }
            }
            
            if(id) queryValues.set('Id',id);

            const payload = {
                id:id,
                columns:fieldNames,
                columnWithValues:queryValues,
                tableName:this.page.model.databaseName,
                user:this.user,
                comboInputs:comboInputs
            } as PostPageInputValueModel;

            console.log("payload:",payload);

            this.dataService.PostPageInputValues(payload)
            .then(response=>{
                if(response && response.result){
                    this.loadPageInputValue(this.page.model.id);
                    this.resetPageInput();
                    toasterService.success('Data Save/Updated Successfully');
                }
            });
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
                    app.dataService.deletePageInputValue(id,tableName)
                    .then(response=>{
                        if(response && response.result){
                            app.loadPageInputValue(app.page.model.id);
                            toasterService.success('Data Deleted Successfully');
                        }
                    });
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
            this.page.id = String(id);
            this.isUpdate = true;
            this.dataService.fetchPageInputValue(this.page.model.id,String(id)).then(response=>{
                if(response && response.result){
                    const data = response.result;
                    _.map(this.pageInputs,item=>{
                        const key = item.databaseName;
                        const value = keyValueList.find(x=>x[0]==key);
                        if(value){
                            item.value = String(value[1]);
                        }
                        _.map(item.checkBoxInput.models,(y)=>y.isChecked = false);
                        if(item.fieldType == FieldType.CheckBox){
                            _.map(String(item.value).split(','),(x:string)=>{
                                _.map(item.checkBoxInput.models,(y)=>{
                                    if(x.trim().toLowerCase() == y.name.trim().toLowerCase()){
                                        y.isChecked = true;
                                    }
                                });
                            })
                        }
                        if(item.fieldType == FieldType.MultiSelect){
                            const findData = data.find(x=>x.id == item.id);
                            if(findData){
                                item.value = findData.comboInput.data.map(x=>x.id);
                            }
                        }
                    });
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
            _.map(this.pageInputs,item=>{
                item.value = null;
                _.map(item.checkBoxInput.models,(x)=>{
                    x.isChecked = false;
                })
            });
            this.isUpdate = false;
            this.page.id = "";
        },
    }
});