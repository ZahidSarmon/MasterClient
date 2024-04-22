<template>
    <div class="container-fluid mt-2">
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
                        <div class="form-group input-field" v-if="isTextBox(item.fieldType)">
                            <label :for="item.id">{{ item.title }}</label>
                            <input :type="item.fieldType" :name="item.title" :id="item.id" v-model="item.value" :placeholder="item.placeHolder" class="e-input" />
                        </div>
                        <div class="form-group input-field" v-if="isDate(item.fieldType)">
                            <label :for="item.id">{{ item.title }}</label>
                            <ejs-datepicker v-model="pageInput.defaultDate" :value="getCurrentDate" :format="getDateFormat"></ejs-datepicker>
                        </div>
                        <div class="form-group input-field" v-if="isDropDown(item.fieldType)">
                            <label :for="item.id">{{ item.title }}</label>
                            <ejs-dropdownlist :id="'dropdown_'+item.id" v-model="item.value" 
                                :placeholder='item.placeHolder' :dataSource='item.comboData' :fields='comboData.fields'>
                            </ejs-dropdownlist>
                        </div>
                        <div class="form-group input-field" v-if="isMultiSelect(item.fieldType)">
                            <label :for="item.id">{{ item.title }}</label>
                            <ejs-multiselect :id="'multiselect_'+item.id" v-model="item.value" 
                                :placeholder='item.placeHolder' :dataSource='item.comboData' :fields='comboData.fields'>
                            </ejs-multiselect>
                        </div>
                        <div class="form-group input-field" v-if="isAutoComplete(item.fieldType)">
                            <label :for="item.id">{{ item.title }}</label>
                            <ejs-autocomplete :id="'autocomplete_'+item.id" v-model="item.value" 
                                :placeholder='item.placeHolder' :dataSource='item.comboData' :fields='comboData.fields'>
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
                            <th v-for="(item,index) in pageInputValue.columns" :key="index">{{ item }}</th>
                            <th>{{ 'Action' }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in pageInputValue.data" :key="index">
                            <td v-for="(subItem,subIndex) in Object.values(item)" :key="subIndex">{{ subItem }}</td>
                            <td>
                                <button class="btn btn-info btn-sm" @click="editPageInput(item)">Edit</button>
                                <button class="btn btn-danger btn-sm ml-1" @click="deletePageInput(item)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script src="./PageManageService"></script>
<style scoped>
</style>