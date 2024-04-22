import { defineComponent } from 'vue';
import { ComboInputTableRef, Page, PageInput} from './PageBuild.model';
import modal from '@/components/common/modalManage';
import _ from 'lodash';
import toasterService from '@/services/toasterService';
import httpClient from '@/services/httpClient';
import { helperUtility } from '@/services/helperUtility';
import { DataType, FieldType, Lookup, PostResponse, dataTypeLookup, fieldTypeLookup } from '../../common/Master.model';
import { DropDownListComponent } from "@syncfusion/ej2-vue-dropdowns";
import { CheckBoxComponent } from "@syncfusion/ej2-vue-buttons";
import { DatePickerComponent } from "@syncfusion/ej2-vue-calendars";
import { DateTimePickerComponent } from "@syncfusion/ej2-vue-calendars";
import { pageBuildHelper } from './PageBuildHelper';
import { PageBuildDataService } from './PageBuildDataService';

export default defineComponent({
    name: 'PageBuildComponent',
    components:{
        'ejs-dropdownlist' : DropDownListComponent,
        "ejs-checkbox": CheckBoxComponent,
        'ejs-datepicker' : DatePickerComponent,
        'ejs-datetimepicker' : DateTimePickerComponent,
    },
    created() {
        this.dataService = new PageBuildDataService();
    },
    data() {
        return{
            dataService:{} as PageBuildDataService,
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
            comboInputManage:{
                isDataBaseSource:false,
                static:{
                    model:{} as Lookup<string>,
                },
                tableSource:{
                    model:{} as Lookup<string>,
                    schema:{
                        data:[] as Lookup<string>[],
                        fields: { text: 'name', value: 'id' },
                    },
                    table:{
                        data:[] as Lookup<string>[],
                        fields: { text: 'name', value: 'id' },
                    },
                    column:{
                        data:[] as Lookup<string>[],
                        fields: { text: 'name', value: 'id' },
                    }
                }
            },
            form: {} as Page,
            pageInputs:[] as PageInput[],
            pageInput:{
                comboInput:{
                    isDataBaseSource:false,
                    data:[] as Lookup<string>[],
                    tableRef:{
                    }
                }
            } as PageInput,

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
        addInput(){
            this.pageInput = {
                isUpdate:false,
                fieldType:this.fieldType.model.Text,
                dataType:this.dataType.model.Varchar,
                isRequired:false,
                isMax:false,
                comboInput:{
                    isDataBaseSource:false,
                    data:[] as Lookup<string>[],
                    tableRef:{

                    }
                }
            } as PageInput;
            this.open('inputModal');
        },
        addField(){
            if(!pageBuildHelper.isValidForm(this.pageInput)){
                toasterService.error(pageBuildHelper.getInValidStatus(this.pageInput)!);
                return;
            }
            this.close('inputModal');
            this.pageInput.id = helperUtility.getGUID();
            this.pageInput.databaseName = this.pageInput.databaseName.replaceAll(" ","_");
            if(!this.pageInput.isUpdate) this.pageInputs.push(this.pageInput);
        },
        removeField(id:string){
            this.pageInputs = this.pageInputs.filter(item => item.id !== id);
        },
        editField(id:string){
            const index = this.pageInputs.findIndex(item => item.id === id);
            if(index==-1) return;
            this.pageInput = this.pageInputs[index];
            this.pageInput.isUpdate = true;
            this.open('inputModal');
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
        onChangeSchema(){
            const schema = this.pageInput.comboInput.tableRef.tableSchema;
            this.dataService.fetchTableNames(schema).then(response => {
                if(response && response.result){
                    this.comboInputManage.tableSource.table.data = response.result;
                }
            });
        },
        onChangeTable(){
            const schema = this.pageInput.comboInput.tableRef.tableSchema;
            const table = this.pageInput.comboInput.tableRef.tableName;
            this.dataService.fetchTableColumns(schema,table).then(response => {
                if(response && response.result){
                    this.comboInputManage.tableSource.column.data = response.result;
                }
            });
        },
        addFixedValue(){
            if(_.isEmpty(this.comboInputManage.static.model.name)) return;
            this.comboInputManage.static.model.id = helperUtility.getGUID();
            this.pageInput.comboInput.data.push(this.comboInputManage.static.model);
            this.comboInputManage.static.model = {} as Lookup<string>;
        },
        removeFixedValue(id:string){
            this.pageInput.comboInput.data = this.pageInput.comboInput.data.filter(item => item.id !== id);
        },
        onClickIsMax(){
            this.pageInput.size = "";
            if(this.pageInput.isMax){
                this.pageInput.size = "max";
            }
        },
        onClickHasDatabaseSource(){
            this.pageInput.comboInput.tableRef = {} as ComboInputTableRef;
            this.pageInput.comboInput.data = [];
            if(this.pageInput.comboInput.isDataBaseSource){
                this.dataService.fetchTableSchemas().then(response => {
                    if(response && response.result){
                        this.comboInputManage.tableSource.schema.data = response.result;
                    }
                });
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
        hasDropdown(){
            return this.pageInput.fieldType == FieldType.DropDown
            || this.pageInput.fieldType == FieldType.AutoComplete
            || this.pageInput.fieldType == FieldType.MultiSelect;
        },
        open(id:string){
            modal.Open(id);
        },
        close(id:string){
            modal.Close(id);
        }
    }
});