import { defineComponent } from 'vue';
import { Page, PageInput} from './Home.model';
import modal from '@/components/common/modalManage';
import _ from 'lodash';
import toasterService from '@/services/toasterService';
import { useHomeStore } from '@/store/homeStore';
import httpClient from '@/services/httpClient';
import { helperUtility } from '@/services/helperUtility';
import moment from 'moment';
import { DataType, FieldType, Lookup, PostResponse } from '../../common/Master.model';

export default defineComponent({
    name: 'HomeComponent',
    setup(){
        const store = useHomeStore();
        return {store};
    },
    mounted(){
        this.store.$patch({count:100});
    },
    data() {
        return{
            fieldType:FieldType,
            dataType:DataType,
            form: {} as Page,
            pageInputs:[] as PageInput[],
            pageInput:{} as PageInput,

        }
    },
    computed:{
    },
    methods:{
        addField(){
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
            if(this.fieldType.Text==fieldType){
                this.pageInput.dataType = this.dataType.Varchar;
            }
            if(this.fieldType.Number==fieldType){
                this.pageInput.dataType = this.dataType.Int;
            }
        },
        open(id:string){
            this.pageInput = {
                fieldType:this.fieldType.Number,
                dataType:this.dataType.Int,
            } as PageInput;
            modal.Open(id);
        },
        close(id:string){
            modal.Close(id);
        }
    }
});