<template>
    <div  class="container-fluid" style="padding-top:0.5em">
        <div class="card card-body m-2 p-0 pt-2 pb-2">
            <div class="row">
                <div class="col-sm-auto">
                    <div class="btn btn-sm btn-primary" @click="addInput">
                        <i class="fas fa-plus">
                        Add Input
                        </i>
                    </div>
                </div>
            </div>
        </div>
        <div class="card card-body m-2 form-responsive">
            <div class="row">
                <div class="col-md-5">
                    <div class="form-group row">
                        <label for="formName" class="col-sm-2 col-form-label">{{ 'Display Name' }}:</label>
                        <div class="col-sm-9">
                            <input v-model="form.name" id="formName" placeholder="Page Name"  class="e-input ml-2" />
                        </div>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="form-group row">
                        <label for="databaseName" class="col-sm-2 col-form-label">{{ 'Database Name' }}:</label>
                        <div class="col-sm-9">
                            <input v-model="form.databaseName" id="databaseName" placeholder="Database Name"  class="e-input ml-2" />
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-sm btn-primary ml-2" @click="createForm">Create Form <i class="fas fa-plus-circle"></i></button>
                </div>
            </div>
            <div class="row mt-2">
                <template v-for="(item,index) in pageInputs" :key="index">
                    <div class="col-md-10">
                        <div class="form-group input-field">
                            <label :for="item.id">{{ item.title }}</label>
                            <input :type="item.fieldType" :name="item.title" :id="item.id" :placeholder="item.placeHolder" class="e-input" />
                        </div>
                    </div>
                    <div class="col-md-2" style="padding-top:2.3em">
                        <div class="row">
                            <a href="#" :id="'edit'+index" class="edit-item mr-2" @click="editField(item.id)">
                                <i class="fas fa-edit"></i>
                            </a>
                            <a href="#" :id="'delete'+index" class="delete-item" @click="removeField(item.id)">
                                <i class="fas fa-trash-alt"></i>
                            </a>
                        </div>
                    </div>
                </template>
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
                        <div class="row">
                            <label for="databaseType_name" class="col-sm-2 col-form-label">{{ 'Database Type' }}</label>
                            <div class="col-sm-9">
                                <ejs-dropdownlist id='dropdownlist_databaseType' v-model="pageInput.dataType" placeholder='Select a database type' :dataSource='dataType.data' :fields='dataType.fields'></ejs-dropdownlist>
                            </div>
                        </div>
                        <div class="form-group row" v-if="hasSize()">
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
                                 @change="onChangeSchema"
                                 placeholder='Select a schema' :dataSource='comboInputManage.tableSource.schema.data' :fields='comboInputManage.tableSource.schema.fields'>
                                </ejs-dropdownlist>
                            </div>
                            <div class="col-sm-2" v-if="pageInput.comboInput.isDataBaseSource">
                                <ejs-dropdownlist id='dropdownlist_table' v-model="pageInput.comboInput.tableRef.tableName" 
                                @change="onChangeTable"
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
                                <ejs-checkbox  id="dbSource_checkbox" @click="onClickHasDatabaseSource" v-model="pageInput.comboInput.isDataBaseSource" label='Has Database Source'>Has Database source</ejs-checkbox>
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
                                                <a href="#" @click="removeFixedValue(item.id)"><i class="fas fa-trash-alt"></i></a>
                                            </td>
                                        </tr>
                                        <tr class="border-left border-bottom">
                                            <td>
                                                <input type="text" class="e-input" v-model="comboInputManage.static.model.name"/>
                                            </td>
                                            <td>
                                                <a href="#" class="btn btn-sm btn-primary" @click="addFixedValue()"><i class="fas fa-plus"></i></a>
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
                        <div class="form-group row">
                            <label for="form_databaseName" class="col-sm-2 col-form-label">{{ 'Database Name' }}</label>
                            <div class="col-sm-9">
                                <input type="text" class="e-input" id="form_databaseName" v-model="pageInput.databaseName">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="form_title" class="col-sm-2 col-form-label">{{ 'Label' }}</label>
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
<style scoped>
    
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
        height: calc(100vh - 200px);
        overflow-y: auto;
    }
</style>