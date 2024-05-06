<template>
    <div class="container-fluid pt-2 pl-1 pr-1">
        <div class="card card-body">
            <div class="form-group row">
                <label for="pageSelect" class="col-sm-1 col-form-label">{{ 'Page' }}:</label>
                <div class="col-sm-4">
                    <ejs-dropdownlist id='dropdownlist_page'  
                        placeholder='Select a page' 
                        :dataSource='page.data' 
                        v-model="page.value"
                        @change="pageChange"
                        :fields='page.fields'>
                    </ejs-dropdownlist>
                </div>
            </div>
            <div class="row mt-2">
                <template v-for="(item,index) in pageInputs" :key="index">
                    <div class="col-md-12">
                        <div class="form-group input-field" v-if="helperUtility.isTextBox(item.fieldType)">
                            <label :for="item.id"><span v-if="item.isRequired" class="text-danger">* </span>{{ item.title }}</label>
                            <input :type="item.fieldType" :name="item.title" :id="item.id" v-model="item.value" :placeholder="item.placeHolder" class="e-input" />
                        </div>
                        <div class="form-group input-field" v-if="helperUtility.isDate(item.fieldType)">
                            <label :for="item.id"><span v-if="item.isRequired" class="text-danger">* </span>{{ item.title }}</label>
                            <ejs-datepicker v-model="item.value" :value="getCurrentDate" :format="getDateFormat"></ejs-datepicker>
                        </div>
                        <div class="form-group input-field row" v-if="helperUtility.isCheckBox(item.fieldType)">
                            <label :for="item.id"><span v-if="item.isRequired" class="text-danger">* </span>{{ item.title }}</label>
                            <span v-for="(checkItem,checkIndex) in item.checkBoxInput.data" :key="checkIndex">
                                <ejs-checkbox   
                                    v-model="item.checkBoxInput.models[checkIndex].isChecked"
                                    :id="checkItem+'_'+checkIndex" :label="checkItem" :name="item.title" style="margin-left:1em;"
                                    >{{ item.title }}</ejs-checkbox>
                            </span>
                        </div>
                        <div class="form-group input-field row" v-if="helperUtility.isRadioButton(item.fieldType)">
                            <label :for="item.id"><span v-if="item.isRequired" class="text-danger">* </span>{{ item.title }}</label>
                            <div class="form-check form-check-inline" v-for="(radioItem,radioIndex) in item.radioInput.data" :key="radioIndex">
                                <input class="form-check-input" type="radio" v-model="item.value" :name="item.title" :id="item.title+'_'+radioIndex" :value="radioItem">
                                <label class="form-check-label" :for="item.title+'_'+radioIndex">{{ radioItem }}</label>
                            </div>
                        </div>
                        <div class="form-group input-field row" v-if="helperUtility.isDropDown(item.fieldType)">
                            <label :for="item.id"><span v-if="item.isRequired" class="text-danger">* </span>{{ item.title }}</label>
                            <ejs-dropdownlist :id="'dropdown_'+item.id" v-model="item.value" 
                                :placeholder='item.placeHolder' :dataSource='item.comboInput.data' :fields='comboData.fields'>
                            </ejs-dropdownlist>
                        </div>
                        <div class="form-group input-field row" v-if="helperUtility.isMultiSelect(item.fieldType)">
                            <label :for="item.id"><span v-if="item.isRequired" class="text-danger">* </span>{{ item.title }}</label>
                            <ejs-multiselect :id="'multiselect_'+item.id" :ref="'multiselect_'+item.id" v-model="item.value" 
                                :placeholder='item.placeHolder' :dataSource='item.comboInput.data' :fields='comboData.fields'>
                            </ejs-multiselect>
                        </div>
                        <div class="form-group input-field row" v-if="helperUtility.isAutoComplete(item.fieldType)">
                            <label :for="item.id"><span v-if="item.isRequired" class="text-danger">* </span>{{ item.title }}</label>
                            <ejs-autocomplete :id="'autocomplete_'+item.id" v-model="item.value" 
                                :placeholder='item.placeHolder' :dataSource='item.comboInput.data' :fields='comboData.fields'>
                            </ejs-autocomplete>
                        </div>
                    </div>
                </template>
                <button class="btn btn-primary btn-sm ml-2 mt-2" @click="savePageInputValues"><i class="fas fa-save"></i> {{ isUpdate?'Update':'Save' }}</button>
            </div>
            <div class="row mt-2">
                <table id="dataTable" class="table table-striped">
                    <thead>
                        <tr>
                            <th v-for="(item,index) in pageInputValue.columns" :key="index" class="pl-0 pr-0">{{ item }}</th>
                            <th>{{ 'Action' }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in pageInputValue.data" :key="index">
                            <td v-for="(subItem,subIndex) in Object.values(item)" :key="subIndex">{{ subItem }}</td>
                            <td>
                                <button class="btn btn-sm" @click="editPageInput(item)"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-sm ml-1" @click="deletePageInput(item)"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script src="./PageManageService"></script>
<style>
.e-checkbox-wrapper e-wrapper{
    margin-right:1em;
}
</style>