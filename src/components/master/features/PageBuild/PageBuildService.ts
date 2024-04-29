import { defineComponent } from 'vue';
import { DatabaseTableRef, PageInput, PageModel, Property} from './PageBuild.model';
import modal from '@/components/common/modalManage';
import _, { has } from 'lodash';
import toasterService from '@/services/toasterService';
import { helperUtility } from '@/services/helperUtility';
import { DataType, FieldType, Lookup, PostResponse, Selective, dataTypeLookup, fieldTypeLookup } from '../../common/Master.model';
import { DropDownListComponent,MultiSelectComponent,AutoCompleteComponent } from "@syncfusion/ej2-vue-dropdowns";
import { CheckBoxComponent,RadioButtonComponent  } from "@syncfusion/ej2-vue-buttons";
import { DatePickerComponent } from "@syncfusion/ej2-vue-calendars";
import { DateTimePickerComponent } from "@syncfusion/ej2-vue-calendars";
import { pageBuildHelper } from './PageBuildHelper';
import { PageBuildDataService } from './PageBuildDataService';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { DialogUtility } from '@syncfusion/ej2-vue-popups';
import { GridComponent as EjsGrid, ColumnsDirective as EColumns, ColumnDirective as EColumn,  Resize, Toolbar, CommandColumn, Page, Group,Sort,Freeze }
    from '@syncfusion/ej2-vue-grids';

const _pageData: Property = {} as Property;

let Confirmation: any = undefined;

export default defineComponent({
    name: 'PageBuildComponent',
    components:{
        "ejs-checkbox": CheckBoxComponent,
        'ejs-datepicker' : DatePickerComponent,
        'ejs-datetimepicker' : DateTimePickerComponent,
        "ejs-grid": EjsGrid,
        "e-columns": EColumns,
        "e-column": EColumn,
        'ejs-dropdownlist' : DropDownListComponent,
        'ejs-multiselect' : MultiSelectComponent,
        'ejs-autocomplete' : AutoCompleteComponent,
        "ejs-radiobutton": RadioButtonComponent
    },
    provide: {
        grid: [Toolbar,Resize, CommandColumn, Page,Sort,Group,Freeze]
    },
    created() {
        this.dataService = new PageBuildDataService();
        this.gridLocalize();
    },
    data() {
        return{
            dataService:{} as PageBuildDataService,
            helperUtility:helperUtility,
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
                    fields: { text: 'name', value: 'id' },
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
            radioInputManage:{
                isDataBaseSource:false,
                static:{
                    model:"",
                    fields: { text: 'name', value: 'id' },
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
            checkboxInputManage:{
                isDataBaseSource:false,
                static:{
                    model:{}as Lookup<string>,
                    fields: { text: 'name', value: 'id' },
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
            form: {
                id: helperUtility.getGUID(),
            } as PageModel,
            pageInputs:[] as PageInput[],
            pageInput:{
                comboInput:{
                    isDataBaseSource:false,
                    data:[] as Lookup<string>[],
                    tableRef:{
                    }
                },
                radioInput:{
                    isDataBaseSource:false,
                    data:[] as string[],
                    tableRef:{
                    }
                },
                checkBoxInput:{
                    isDataBaseSource:false,
                    data:[] as Lookup<string>[],
                    tableRef:{
                    }
                }
            } as PageInput,
            pageTable:{
                data:_pageData,
                searchOptions: { fields: ['DatabaseName','Name','Definition'], operator: 'contains', ignoreCase: true },
                editSettings: { allowAdding: true },
                toolbar: ['Search'],
                pageSettings: {
                    pageSizes: [10, 20, 50, 100],
                    pageSize: 50,
                    pageCount: 1
                },
                commands: [
                    { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
                    { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } },
                ],
                locale: '',
            }

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
    mounted(){
        this.dataStateChange(this.initState());
    },
    methods:{
        initState():any{
            const state = {
                        skip: 0,
                        take: this.pageTable.pageSettings.pageSize
                    };
            return state;
        },
        dataStateChange(state:any) {
            this.gridLocalize();
            this.loadPages(state);
        },
        loadPages(state:any) {
            if (state.action) {
                delete state.action;
            }

            this.dataService.fetchPages(state).then((response) => {
                if (response.result) {
                    this.pageTable.data = response.result;
                }
            }).catch(() => { });
        },
        commandClick: function (args: { commandColumn: any, rowData: any }) {
            const app = this;
            if (args) {
                switch (args.commandColumn.type) {
                    case 'Delete':
                        this.form.id = args.rowData.id;
                        Confirmation = DialogUtility.confirm({
                            title: this.$t("Delete Confirmation"),
                            content: this.$t("Are you sure you want to delete this record?"),
                            okButton: {
                            text: this.$t("ok"),
                            click: async function () {
                                Confirmation.hide();
                                app.onDelete(app.form.id);
                            },
                            },
                            cancelButton: { text: this.$t("cancel") },
                            showCloseIcon: true,
                            closeOnEscape: true,
                            zIndex: 10000,
                            animationSettings: { effect: "Zoom" },
                        });
                        break;
                    case 'Edit':
                        this.form = args.rowData;
                        this.pageInputs = JSON.parse(this.form.definition);
                        break;
                    default: break;
                }
            }
        },
        toolbarClick: function (args: any) {
            
        },
        gridLocalize() {
            this.pageTable.locale = 'en-grid';
            if (this.$i18n.locale == 'se') {
                setTimeout(() => {
                    // import(`@/assets/sv.json`).then(module => {
                    //     const localText = module.default;
                    //     this.pageTable.locale = 'sv';
                    //     setCulture('sv');
                    //     L10n.load(localText);
                    // });
                });
            }
        },
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
                },
                radioInput:{
                    isDataBaseSource:false,
                    data:[] as string[],
                    tableRef:{

                    }
                },
                checkBoxInput:{
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
            if(this.pageInput.isUpdate){
                console.log("Update:",this.pageInput);
                console.log("Updates:",this.pageInputs);
                const index = this.pageInputs.findIndex(item => item.id === this.pageInput.id);
                if(index==-1) return;
                this.pageInputs[index] = _.cloneDeep(this.pageInput);
            }else{
                this.pageInput.id = helperUtility.getGUID();
                this.pageInputs.push(this.pageInput);
            }
        },
        removeField(id:string){
            this.pageInputs = this.pageInputs.filter(item => item.id !== id);
        },
        editField(id:string){
            const index = this.pageInputs.findIndex(item => item.id === id);
            if(index==-1) return;
            this.pageInput = _.cloneDeep(this.pageInputs[index]);
            this.pageInput.isUpdate = true;
            this.open('inputModal');
        },
        async upsertPageInput(){
            console.log("pageInput:",this.pageInputs);
            this.form.definition = JSON.stringify(this.pageInputs);

            if(!pageBuildHelper.isValidPage(this.form)){
                toasterService.error(pageBuildHelper.getPageValidStatus(this.form)!);
                return;
            }

            const payload = {
                ...this.form
            }

            const response = await this.dataService.postPageInputs(payload);
            if(response){
                this.resetPageInput();
                toasterService.success('Form Created Successfully');
            }
        },
        onDelete(id:string){
            this.dataService.deletePage(id).then(response => {
                if(response && response.result){
                    toasterService.success('Form Deleted Successfully');
                    this.loadPages(this.initState());
                }
            })
        },
        fieldTypeChange(fieldType:string){
            // if(this.fieldType.Text==fieldType){
            //     this.pageInput.dataType = this.dataType.Varchar;
            // }
            // if(this.fieldType.Number==fieldType){
            //     this.pageInput.dataType = this.dataType.Int;
            // }
        },
        onChangeSchemaDropdown(){
            const schema = this.pageInput.comboInput.tableRef.tableSchema;
            this.dataService.fetchTableNames(schema).then(response => {
                if(response && response.result){
                    this.comboInputManage.tableSource.table.data = response.result;
                }
            });
        },
        onChangeSchemaRadio(){
            const schema = this.pageInput.radioInput.tableRef.tableSchema;
            this.dataService.fetchTableNames(schema).then(response => {
                if(response && response.result){
                    this.radioInputManage.tableSource.table.data = response.result;
                }
            });
        },
        onChangeSchemaCheckbox(){
            const schema = this.pageInput.checkBoxInput.tableRef.tableSchema;
            this.dataService.fetchTableNames(schema).then(response => {
                if(response && response.result){
                    this.checkboxInputManage.tableSource.table.data = response.result;
                }
            });
        },
        onChangeTableDropdown(){
            const schema = this.pageInput.comboInput.tableRef.tableSchema;
            const table = this.pageInput.comboInput.tableRef.tableName;
            this.dataService.fetchTableColumns(schema,table).then(response => {
                if(response && response.result){
                    this.comboInputManage.tableSource.column.data = response.result;
                }
            });
        },
        onChangeTableRadio(){
            const schema = this.pageInput.radioInput.tableRef.tableSchema;
            const table = this.pageInput.radioInput.tableRef.tableName;
            this.dataService.fetchTableColumns(schema,table).then(response => {
                if(response && response.result){
                    this.radioInputManage.tableSource.column.data = response.result;
                }
            });
        },
        onChangeTableCheckbox(){
            const schema = this.pageInput.checkBoxInput.tableRef.tableSchema;
            const table = this.pageInput.checkBoxInput.tableRef.tableName;
            this.dataService.fetchTableColumns(schema,table).then(response => {
                if(response && response.result){
                    this.checkboxInputManage.tableSource.column.data = response.result;
                }
            });
        },
        addFixedValueDropdown(){
            if(_.isEmpty(this.comboInputManage.static.model.name)) return;
            this.comboInputManage.static.model.id = this.comboInputManage.static.model.name;
            this.pageInput.comboInput.data.push(this.comboInputManage.static.model);
            this.comboInputManage.static.model = {} as Lookup<string>;
        },
        addFixedValueRadio(){
            if(_.isEmpty(this.radioInputManage.static.model)) return;
            this.pageInput.radioInput.data.push(this.radioInputManage.static.model);
            this.radioInputManage.static.model = "";
        },
        addFixedValueCheckbox(){
            if(_.isEmpty(this.checkboxInputManage.static.model)) return;
            this.checkboxInputManage.static.model.id = this.checkboxInputManage.static.model.name;
            this.pageInput.checkBoxInput.data.push(this.checkboxInputManage.static.model);
            console.log("Checkbox:",this.pageInput.checkBoxInput.data);
            this.checkboxInputManage.static.model = {} as Lookup<string>;
        },
        removeFixedValueDropdown(id:string){
            this.pageInput.comboInput.data = this.pageInput.comboInput.data.filter(item => item.id !== id);
        },
        removeFixedValueRadio(id:string){
            this.pageInput.radioInput.data = this.pageInput.radioInput.data.filter(item => item !== id);
        },
        removeFixedValueCheckbox(id:string){
            this.pageInput.checkBoxInput.data = this.pageInput.checkBoxInput.data.filter(item => item.id !== id);
        },
        onClickIsMax(){
            this.pageInput.size = "";
            if(this.pageInput.isMax){
                this.pageInput.size = "max";
            }
        },
        onClickHasDatabaseSourceDropdown(){
            this.pageInput.comboInput.tableRef = {} as DatabaseTableRef;
            this.pageInput.comboInput.data = [];
            if(this.pageInput.comboInput.isDataBaseSource){
                this.dataService.fetchTableSchemas().then(response => {
                    if(response && response.result){
                        this.comboInputManage.tableSource.schema.data = response.result;
                    }
                });
            }
        },
        onClickHasDatabaseSourceRadio(){
            this.pageInput.radioInput.tableRef = {} as DatabaseTableRef;
            this.pageInput.radioInput.data = [];
            if(this.pageInput.radioInput.isDataBaseSource){
                this.dataService.fetchTableSchemas().then(response => {
                    if(response && response.result){
                        this.radioInputManage.tableSource.schema.data = response.result;
                    }
                });
            }
        },
        onClickHasDatabaseSourceCheckbox(){
            this.pageInput.checkBoxInput.tableRef = {} as DatabaseTableRef;
            this.pageInput.checkBoxInput.data = [];
            if(this.pageInput.checkBoxInput.isDataBaseSource){
                this.dataService.fetchTableSchemas().then(response => {
                    if(response && response.result){
                        this.checkboxInputManage.tableSource.schema.data = response.result;
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
        hasRadio(){
            return this.pageInput.fieldType == FieldType.Radio;
        },
        hasCheckbox(){
            return this.pageInput.fieldType == FieldType.CheckBox;
        },
        resetPageInput(){
            this.pageInputs=[];
            this.form = {
                id: helperUtility.getGUID(),
            } as PageModel;
            this.loadPages(this.initState());
        },
        open(id:string){
            modal.Open(id);
        },
        close(id:string){
            modal.Close(id);
        }
    }
});