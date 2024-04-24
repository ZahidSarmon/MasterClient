<template>
    <div  class="container-fluid" style="padding-top:0.5em">
        <div class="card card-body m-2 form-responsive">
            <div class="row">
                <div class="col-md-5">
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">{{ 'Display Name' }}</span>
                        </div>
                        <input type="text" v-model="form.name" class="form-control" aria-label="DisplayName" aria-describedby="inputGroup-sizing-sm">
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">{{ 'Database Table Name' }}</span>
                        </div>
                        <input type="text" v-model="form.databaseName" class="form-control" aria-label="DatabaseTableName" aria-describedby="inputGroup-sizing-sm">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="btn btn-sm btn-primary" @click="addInput">
                        <i class="fas fa-plus">
                        Add Input
                        </i>
                    </div>
                </div>
            </div>
            <div class="row mt-2" v-if="pageInputs && pageInputs.length>0">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in pageInputs" :key="index">
                                <td>{{ item.title }}</td>
                                <td>
                                    <div class="form-group input-field" v-if="helperUtility.isTextBox(item.fieldType)">
                                        <input :type="item.fieldType" :name="item.title" :id="item.id" v-model="item.value" :placeholder="item.placeHolder" class="e-input" />
                                    </div>
                                    <div class="form-group input-field" v-if="helperUtility.isDate(item.fieldType)">
                                        <ejs-datepicker v-model="item.value" :value="getCurrentDate" :format="getDateFormat"></ejs-datepicker>
                                    </div>
                                    <div class="form-group input-field" v-if="helperUtility.isCheckBox(item.fieldType)">
                                        <ejs-checkbox  
                                        v-for="(checkItem,checkIndex) in item.checkBoxInput.data" :key="checkIndex" 
                                        :id="checkItem+'_'+checkIndex" :label="checkItem" :name="checkItem" class="mr-2"
                                        >{{ item.title }}</ejs-checkbox>
                                    </div>
                                    <div class="form-group input-field" v-if="helperUtility.isRadioButton(item.fieldType)">
                                        <div class="form-check form-check-inline" v-for="(radioItem,radioIndex) in item.radioInput.data" :key="radioIndex">
                                            <input class="form-check-input" type="radio" v-model="item.value" :name="item.title" :id="item.title+'_'+radioIndex" :value="radioItem">
                                            <label class="form-check-label" :for="item.title+'_'+radioIndex">{{ radioItem }}</label>
                                        </div>
                                    </div>
                                    <div class="form-group input-field" v-if="helperUtility.isDropDown(item.fieldType)">
                                        <ejs-dropdownlist :id="'dropdown_'+item.id" v-model="item.value" 
                                            :placeholder='item.placeHolder' :dataSource='item.comboInput.data' :fields='comboInputManage.static.fields'>
                                        </ejs-dropdownlist>
                                    </div>
                                    <div class="form-group input-field" v-if="helperUtility.isMultiSelect(item.fieldType)">
                                        <ejs-multiselect :id="'multiselect_'+item.id" v-model="item.value" 
                                            :placeholder='item.placeHolder' :dataSource='item.comboInput.data' :fields='comboInputManage.static.fields'>
                                        </ejs-multiselect>
                                    </div>
                                    <div class="form-group input-field" v-if="helperUtility.isAutoComplete(item.fieldType)">
                                        <ejs-autocomplete :id="'autocomplete_'+item.id" v-model="item.value" 
                                            :placeholder='item.placeHolder' :dataSource='item.comboInput.data' :fields='comboInputManage.static.fields'>
                                        </ejs-autocomplete>
                                    </div>
                                </td>
                                <td>
                                    <a href="#" @click="editField(item.id)"><i class="fas fa-edit mr-2"></i></a>
                                    <a href="#" @click="removeField(item.id)"><i class="fas fa-trash-alt"></i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button class="btn btn-sm btn-primary" @click="upsertPageInput">Build Form <i class="fas fa-plus-circle"></i></button>
            </div>
            <div class="row mt-2">
                <ejs-grid ref="gridPage" 
                    :dataSource="pageTable.data" 
                    :toolbar='pageTable.toolbar' 
                    :allowPaging="true" :allowResizing='true'
                    :pageSettings='pageTable.pageSettings' 
                    :locale='pageTable.locale' 
                    :rowHeight='25'
                    :allowSorting='true' 
                    :autoFit="true"
                    :editSettings='pageTable.editSettings'
                    :toolbarClick='toolbarClick'
                    :searchSettings='pageTable.searchOptions'
                    :dataStateChange='dataStateChange'
                    :commandClick='commandClick'>
                    <e-columns>
                        <e-column :headerText="$t('databaseTableName')" field='DatabaseName'></e-column>
                        <e-column :headerText="$t('displayName')" field='Name'></e-column>
                        <e-column :headerText="$t('definition')" field='Definition'></e-column>
                        <e-column :headerText="$t('actions')" textAlign="Center"
                            :commands='pageTable.commands'
                            ></e-column>
                    </e-columns>
                </ejs-grid>
            </div>
        </div>
    </div>
    <div class="modal fade" id="inputModal" role="dialog">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{ 'Input' }}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close('inputModal')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form>
                    <div class="modal-body">
                        <div class="row">
                            <label for="fieldType_name" class="col-sm-2 col-form-label">{{ 'Field Type' }}</label>
                            <div class="col-sm-9">
                                <ejs-dropdownlist id='dropdownlist_fieldType' v-model="pageInput.fieldType" placeholder='Select a field type' :dataSource='fieldType.data' :fields='fieldType.fields'></ejs-dropdownlist>
                            </div>
                        </div>
                        <div class="row" v-if="pageInput.fieldType != fieldType.model.MultiSelect">
                            <label for="databaseType_name" class="col-sm-2 col-form-label">{{ 'Database Type' }}</label>
                            <div class="col-sm-9">
                                <ejs-dropdownlist id='dropdownlist_databaseType' v-model="pageInput.dataType" placeholder='Select a database type' :dataSource='dataType.data' :fields='dataType.fields'></ejs-dropdownlist>
                            </div>
                        </div>
                        <div class="form-group row" v-if="hasSize() && pageInput.fieldType != fieldType.model.MultiSelect">
                            <label for="size" class="col-sm-2 col-form-label">{{ 'Size' }}</label>
                            <div :class="hasMax()?'col-sm-7':'col-sm-9'">
                                <input type="text" class="e-input" id="size" v-model="pageInput.size" :disabled="pageInput.isMax">
                            </div>
                            <div class="col-sm-2" v-if="hasMax()">
                                <ejs-checkbox  id="sizeMax_checkbox" @click="onClickIsMax" v-model="pageInput.isMax" label='Is Max'>Is Max</ejs-checkbox>
                            </div>
                        </div>
                        <div class="form-group row" v-if="hasDropdown()">
                            <label for="dropdownRef" class="col-sm-2 col-form-label">{{ 'Dropdown Ref.' }}</label>
                            <div class="col-sm-2" v-if="pageInput.comboInput.isDataBaseSource">
                                <ejs-dropdownlist id='dropdownlist_schema' v-model="pageInput.comboInput.tableRef.tableSchema" 
                                 @change="onChangeSchemaDropdown"
                                 placeholder='Select a schema' :dataSource='comboInputManage.tableSource.schema.data' :fields='comboInputManage.tableSource.schema.fields'>
                                </ejs-dropdownlist>
                            </div>
                            <div class="col-sm-2" v-if="pageInput.comboInput.isDataBaseSource">
                                <ejs-dropdownlist id='dropdownlist_table' v-model="pageInput.comboInput.tableRef.tableName" 
                                @change="onChangeTableDropdown"
                                 placeholder='Select a table' :dataSource='comboInputManage.tableSource.table.data' :fields='comboInputManage.tableSource.table.fields'>
                                </ejs-dropdownlist>
                            </div>
                            <div class="col-sm-2" v-if="pageInput.comboInput.isDataBaseSource">
                                <ejs-dropdownlist id='dropdownlist_columnId' v-model="pageInput.comboInput.tableRef.idColumn"
                                 placeholder='Select a column(Id)' :dataSource='comboInputManage.tableSource.column.data' :fields='comboInputManage.tableSource.column.fields'>
                                </ejs-dropdownlist>
                            </div>
                            <div class="col-sm-2" v-if="pageInput.comboInput.isDataBaseSource">
                                <ejs-dropdownlist id='dropdownlist_columnName' v-model="pageInput.comboInput.tableRef.nameColumn" 
                                 placeholder='Select a column(Name)' :dataSource='comboInputManage.tableSource.column.data' :fields='comboInputManage.tableSource.column.fields'>
                                </ejs-dropdownlist>
                            </div>
                            <div class="col-sm-2">
                                <ejs-checkbox  id="dbSource_checkbox" @click="onClickHasDatabaseSourceDropdown" v-model="pageInput.comboInput.isDataBaseSource" label='Has Database Source'>Has Database source</ejs-checkbox>
                            </div>
                        </div>
                        <div class="form-group row" v-if="!pageInput.comboInput.isDataBaseSource && hasDropdown()">
                            <label for="dropdown_data" class="col-sm-2 col-form-label">{{ 'Dropdown Data' }}</label>
                            <div class="table-responsive">
                                <table class="table table-striped table-sm">
                                    <thead>
                                        <tr class="border-left">
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,index) in pageInput.comboInput.data" :key="index" class="border-left border-bottom">
                                            <td>{{ item.name }}</td>
                                            <td>
                                                <a href="#" @click="removeFixedValueDropdown(item.id)"><i class="fas fa-trash-alt"></i></a>
                                            </td>
                                        </tr>
                                        <tr class="border-left border-bottom">
                                            <td>
                                                <input type="text" class="e-input" v-model="comboInputManage.static.model.name"/>
                                            </td>
                                            <td>
                                                <a href="#" class="btn btn-sm btn-primary" @click="addFixedValueDropdown()"><i class="fas fa-plus"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="form-group row" v-if="hasRadio()">
                            <label for="radioRef" class="col-sm-2 col-form-label">{{ 'Radio Ref.' }}</label>
                            <div class="col-sm-2" v-if="pageInput.radioInput.isDataBaseSource">
                                <ejs-dropdownlist id='radio_schema' v-model="pageInput.radioInput.tableRef.tableSchema" 
                                 @change="onChangeSchemaRadio"
                                 placeholder='Select a schema' :dataSource='radioInputManage.tableSource.schema.data' :fields='radioInputManage.tableSource.schema.fields'>
                                </ejs-dropdownlist>
                            </div>
                            <div class="col-sm-2" v-if="pageInput.radioInput.isDataBaseSource">
                                <ejs-dropdownlist id='radio_table' v-model="pageInput.radioInput.tableRef.tableName" 
                                @change="onChangeTableRadio"
                                 placeholder='Select a table' :dataSource='radioInputManage.tableSource.table.data' :fields='radioInputManage.tableSource.table.fields'>
                                </ejs-dropdownlist>
                            </div>
                            <div class="col-sm-2" v-if="pageInput.radioInput.isDataBaseSource">
                                <ejs-dropdownlist id='radio_columnId' v-model="pageInput.radioInput.tableRef.idColumn"
                                 placeholder='Select a column' :dataSource='radioInputManage.tableSource.column.data' :fields='radioInputManage.tableSource.column.fields'>
                                </ejs-dropdownlist>
                            </div>
                            <div class="col-sm-2">
                                <ejs-checkbox  id="radio_dbSource_checkbox" @click="onClickHasDatabaseSourceRadio" v-model="pageInput.radioInput.isDataBaseSource" label='Has Database Source'>Has Database source</ejs-checkbox>
                            </div>
                        </div>
                        <div class="form-group row" v-if="!pageInput.radioInput.isDataBaseSource && hasRadio()">
                            <label for="radio_data" class="col-sm-2 col-form-label">{{ 'Radio Data' }}</label>
                            <div class="table-responsive">
                                <table class="table table-striped table-sm">
                                    <thead>
                                        <tr class="border-left">
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,index) in pageInput.radioInput.data" :key="index" class="border-left border-bottom">
                                            <td>{{ item }}</td>
                                            <td>
                                                <a href="#" @click="removeFixedValueRadio(item)"><i class="fas fa-trash-alt"></i></a>
                                            </td>
                                        </tr>
                                        <tr class="border-left border-bottom">
                                            <td>
                                                <input type="text" class="e-input" v-model="radioInputManage.static.model"/>
                                            </td>
                                            <td>
                                                <a href="#" class="btn btn-sm btn-primary" @click="addFixedValueRadio()"><i class="fas fa-plus"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="form-group row" v-if="hasCheckbox()">
                            <label for="checkboxRef" class="col-sm-2 col-form-label">{{ 'Checkbox Ref.' }}</label>
                            <div class="col-sm-2" v-if="pageInput.checkBoxInput.isDataBaseSource">
                                <ejs-dropdownlist id='checkbox_schema' v-model="pageInput.checkBoxInput.tableRef.tableSchema" 
                                 @change="onChangeSchemaCheckbox"
                                 placeholder='Select a schema' :dataSource='checkboxInputManage.tableSource.schema.data' :fields='checkboxInputManage.tableSource.schema.fields'>
                                </ejs-dropdownlist>
                            </div>
                            <div class="col-sm-2" v-if="pageInput.checkBoxInput.isDataBaseSource">
                                <ejs-dropdownlist id='checkbox_table' v-model="pageInput.checkBoxInput.tableRef.tableName" 
                                @change="onChangeTableCheckbox"
                                 placeholder='Select a table' :dataSource='checkboxInputManage.tableSource.table.data' :fields='checkboxInputManage.tableSource.table.fields'>
                                </ejs-dropdownlist>
                            </div>
                            <div class="col-sm-2" v-if="pageInput.checkBoxInput.isDataBaseSource">
                                <ejs-dropdownlist id='checkbox_columnId' v-model="pageInput.checkBoxInput.tableRef.idColumn"
                                 placeholder='Select a column' :dataSource='checkboxInputManage.tableSource.column.data' :fields='checkboxInputManage.tableSource.column.fields'>
                                </ejs-dropdownlist>
                            </div>
                            <div class="col-sm-2">
                                <ejs-checkbox  id="checkbox_dbSource_checkbox" @click="onClickHasDatabaseSourceCheckbox" v-model="pageInput.checkBoxInput.isDataBaseSource" label='Has Database Source'>Has Database source</ejs-checkbox>
                            </div>
                        </div>
                        <div class="form-group row" v-if="!pageInput.checkBoxInput.isDataBaseSource && hasCheckbox()">
                            <label for="checkbox_data" class="col-sm-2 col-form-label">{{ 'Checkbox Data' }}</label>
                            <div class="table-responsive">
                                <table class="table table-striped table-sm">
                                    <thead>
                                        <tr class="border-left">
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,index) in pageInput.checkBoxInput.data" :key="index" class="border-left border-bottom">
                                            <td>{{ item.name }}</td>
                                            <td>
                                                <a href="#" @click="removeFixedValueCheckbox(item.id)"><i class="fas fa-trash-alt"></i></a>
                                            </td>
                                        </tr>
                                        <tr class="border-left border-bottom">
                                            <td>
                                                <input type="text" class="e-input" v-model="checkboxInputManage.static.model.name"/>
                                            </td>
                                            <td>
                                                <a href="#" class="btn btn-sm btn-primary" @click="addFixedValueCheckbox()"><i class="fas fa-plus"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="form-group row" v-if="pageInput.dataType == dataType.model.Decimal">
                            <label for="decimal_field" class="col-sm-2 col-form-label">{{ 'Decimal Place' }}</label>
                            <div class="col-sm-9">
                                <input type="number" class="e-input" id="decimal_field" v-model="pageInput.decimalPlace">
                            </div>
                        </div>
                        <div class="form-group row" v-if="pageInput.dataType==dataType.model.Date || pageInput.dataType == dataType.model.DateTime">
                            <label for="defaultDate" class="col-sm-2 col-form-label">{{ 'Default Date' }}</label>
                            <div class="col-sm-9">
                                <ejs-datepicker v-model="pageInput.defaultDate" :value="getCurrentDate" :format="getDateFormat"></ejs-datepicker>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="form_checkbox" class="col-sm-2 col-form-label">{{ 'Is Required' }}</label>
                            <div class="col-sm-9">
                                <ejs-checkbox  id="form_checkbox" v-model="pageInput.isRequired" label='Is Required'>Is Required</ejs-checkbox>
                            </div>
                        </div>
                        <div class="form-group row" v-if="pageInput.fieldType != fieldType.model.MultiSelect">
                            <label for="form_databaseName" class="col-sm-2 col-form-label">{{ 'Database Name' }}</label>
                            <div class="col-sm-9">
                                <input type="text" class="e-input" id="form_databaseName" v-model="pageInput.databaseName">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="form_title" class="col-sm-2 col-form-label">{{ 'Title' }}</label>
                            <div class="col-sm-9">
                                <input type="text" class="e-input" id="form_title" v-model="pageInput.title">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="placeholder" class="col-sm-2 col-form-label">{{ 'Placeholder' }}</label>
                            <div class="col-sm-9">
                                <input type="text" class="e-input" id="placeholder" v-model="pageInput.placeHolder">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-primary" @click="addField">
                            <i class="fas fa-save"></i>&nbsp; {{ 'Ok' }}
                        </button>
                        <button type="button" class="btn btn-sm btn-danger" @click="close('inputModal')">
                            <i class="fas fa-times"></i> {{ $t('close') }}
                        </button>
                    </div>
                </form>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</template>
<script lang="ts" src="./PageBuildService"></script>
<style>
    
    .row{
        margin: 0;
    }
    .container-fluid{
        padding: 0;
    }
    .input-field{
        width:98%;
    }
    .input-field:hover{
        width:98%;
    }

    .delete-item{
        cursor: pointer;
        color:rgb(102, 12, 12);
        display: block;
    }

    .edit-item{
        cursor: pointer;
        color:rgb(11, 125, 122);
        display: block;
    }

    .form-responsive{
        height: calc(100vh - 150px);
        overflow-y: auto;
    }

    .table-responsive{
        height: calc(100vh - 700px);
        overflow-y: auto;
    }

    .e-grid .e-gridcontent{
        overflow-y: auto;
        height: calc(100vh - 690px) !important;
    }

    .table td{
        padding: 0;
    }
</style>