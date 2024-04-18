import { defineComponent } from 'vue';
import { FieldType, GetPageInputResponse, GetPageResponse, Lookup, Page, PageInput,PageInputModel,PostResponse, Selective } from './Home.model';
import modal from '@/components/common/modalManage';
import _ from 'lodash';
import toasterService from '@/services/toasterService';
import { useHomeStore } from '@/store/homeStore';
import httpClient from '@/services/httpClient';
import { DataType } from './Home.model';
import { helperUtility } from '@/services/helperUtility';

export default defineComponent({
    name: 'HomeComponent',
    setup(){
        const store = useHomeStore();
        return {store};
    },
    mounted(){
        this.store.$patch({count:100});
        this.loadPages();
    },
    data() {
        return{
            fieldType:FieldType,
            dataType:DataType,
            form: {} as Page,
            pageInputs:[] as PageInput[],
            pageInput:{} as PageInput,
            pageInputModels:[] as PageInputModel[],
            pages:[] as Lookup<string>[]

        }
    },
    methods:{
        addField(){
            this.close('inputModal');
            this.pageInput.id = helperUtility.getGUID();
            this.pageInputs.push(this.pageInput);
        },
        removeField(id:string){
            this.pageInputs = this.pageInputs.filter(item => item.id !== id);
        },
        async createForm(){
            this.form.definition = JSON.stringify(this.pageInputs);
            const payload = {
                ...this.form
            }
            const response = await httpClient.post<PostResponse>(`Page`,payload);
            if(response){
                this.pageInputs=[];
                toasterService.success('Form Created Successfully');
            }
        },
        async loadPageInputs(id:string){
            const response = await httpClient.get<GetPageInputResponse>(`Page/GetPageInputsByPage?id=${id}`);
            if(response && response.result){
                this.pageInputModels = response.result;
            }
        },
        async loadPages(){
            const response = await httpClient.get<GetPageResponse>(`Page`);
            if(response && response.result){
                this.pages = response.result;
            }
        },
        pageChange(event:any){
            if(event){
                const id = event.target.value;
                this.loadPageInputs(id);
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