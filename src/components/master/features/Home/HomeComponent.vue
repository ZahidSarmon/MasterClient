<template>
    <div  class="container-fluid" style="padding-top:0.5em">
        <div class="card card-body m-2 p-0 pt-2 pb-2">
            <div class="row">
                <div class="col-sm-auto">
                    <div class="btn btn-sm btn-default" @click="open('inputModal')">
                        <i class="fas fa-plus">
                        Add Input
                        </i>
                    </div>
                </div>
                <div class="col-sm-auto">
                    <div class="btn btn-sm btn-default">
                        <i class="fas fa-plus">
                            Add Radio
                        </i>
                    </div>
                </div>
                <div class="col-sm-auto">
                    <div class="btn btn-sm btn-default">
                        <i class="fas fa-plus">
                            Add Checkbox
                        </i>
                    </div>
                </div>
                <div class="col-sm-auto">
                    <div class="btn btn-sm btn-default">
                        <i class="fas fa-plus">
                            Add Date
                        </i>
                    </div>
                </div>
                <div class="col-sm-auto">
                    <div class="btn btn-sm btn-default">
                        <i class="fas fa-plus">
                            Add Dropdown
                        </i>
                    </div>
                </div>
                <div class="col-sm-auto">
                    <div class="btn btn-sm btn-default">
                        <i class="fas fa-plus">
                            Add Autocomplete
                        </i>
                    </div>
                </div>
            </div>
        </div>
        <div class="card card-body m-2 form-responsive">
            <div class="form-group row">
                <label for="formName" class="col-sm-2 col-form-label">{{ 'Display Name' }}:</label>
                <div class="col-sm-10">
                    <input v-model="form.name" id="formName" placeholder="Page Name"  class="form-control input-sm ml-2" />
                </div>
            </div>
            <div class="form-group row">
                <label for="databaseName" class="col-sm-2 col-form-label">{{ 'Database Name' }}:</label>
                <div class="col-sm-10">
                    <input v-model="form.databaseName" id="databaseName" placeholder="Database Name"  class="form-control input-sm ml-2" />
                </div>
            </div>
            <div class="form-group row">
                <label for="createFormId" class="col-sm-2 col-form-label">{{ '' }}</label>
                <div class="col-sm-2">
                    <button class="btn btn-sm btn-primary ml-2" @click="createForm">Create Form <i class="fas fa-plus-circle"></i></button>
                </div>
            </div>
            <div class="row mt-2 template-input">
                <template v-for="(item,index) in pageInputs" :key="index">
                    <div class="col-md-11">
                        <div class="form-group input-field">
                            <label :for="item.id">{{ item.title }}</label>
                            <input :type="item.fieldType" :name="item.title" :id="item.id" :placeholder="item.placeHolder" class="form-control input-sm" />
                        </div>
                    </div>
                    <div class="col-md-1 delete-pane" style="padding-top:2.3em">
                        <div :id="'delete'+index" class="delete-item" @click="removeField(item.id)">
                            <i class="fas fa-trash-alt"></i>
                        </div>
                    </div>
                </template>
            </div>
            <div class="form-group row">
                <label for="pageSelect" class="col-md-1 col-form-label">{{ 'Page' }}:</label>
                <div class="col-md-4">
                    <select class="form-control input-sm" @change="pageChange($event)">
                        <option value="0">{{ 'Select Page' }}</option>
                        <option v-for="(item,index) in pages" :key="index"  :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
            </div>
            <div class="row mt-2 template-input">
                <template v-for="(item,index) in pageInputModels" :key="index">
                    <div class="col-md-12">
                        <div class="form-group input-field">
                            <label :for="item.id">{{ item.title }}</label>
                            <input :type="item.fieldType" :name="item.title" :id="item.id" :placeholder="item.placeHolder" class="form-control input-sm" />
                        </div>
                    </div>
                </template>
                
            </div>
        </div>
    </div>
    <div class="modal fade" id="inputModal" role="dialog">
        <div class="modal-dialog modal-md">
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
                            <label for="name" class="col-sm-4 col-form-label">{{ 'Field Type' }} :</label>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" v-model="pageInput.fieldType" @change="fieldTypeChange(fieldType.Text)" type="radio" name="fieldType"
                                 id="fieldType1" :value="fieldType.Text" checked>
                                <label class="form-check-label" for="fieldType1">{{ fieldType.Text }}</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" v-model="pageInput.fieldType" @change="fieldTypeChange(fieldType.Number)" type="radio" name="fieldType" 
                                id="fieldType2" :value="fieldType.Number" >
                                <label class="form-check-label" for="fieldType2">{{ fieldType.Number }}</label>
                            </div>
                        </div>
                        <div class="row">
                            <label for="name" class="col-sm-4 col-form-label">{{ 'Database Type' }} :</label>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" v-model="pageInput.dataType" type="radio" name="dataType"
                                 id="dataType1" :value="dataType.Int" checked>
                                <label class="form-check-label" for="dataType1">{{ dataType.Int }}</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" v-model="pageInput.dataType" type="radio" name="dataType"
                                 id="dataType2" :value="dataType.Int" checked>
                                <label class="form-check-label" for="dataType2">{{ dataType.Bigint }}</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" v-model="pageInput.dataType" type="radio" name="dataType" 
                                id="dataType3" :value="dataType.Varchar">
                                <label class="form-check-label" for="dataType3">{{ dataType.Varchar }}</label>
                            </div>
                        </div>
                        <div class="form-group row" v-if="dataType.Varchar == pageInput.dataType">
                            <label for="varcharSize" class="col-sm-3 col-form-label">{{ 'Varchar Size' }}</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control input-sm" id="varcharSize" v-model="pageInput.varcharSize">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="form_title" class="col-sm-3 col-form-label">{{ 'Label' }}</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control input-sm" id="form_title" v-model="pageInput.title">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="placeholder" class="col-sm-3 col-form-label">{{ 'Placeholder' }}</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control input-sm" id="placeholder" v-model="pageInput.placeHolder">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="form_databaseName" class="col-sm-3 col-form-label">{{ 'Database Name' }}</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control input-sm" id="form_databaseName" v-model="pageInput.databaseName">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-info btn-flat" @click="addField">
                            <i class="fas fa-save"></i>&nbsp; {{ 'Ok' }}
                        </button>
                        <button type="button" class="btn btn-sm btn-danger btn-flat" @click="close('inputModal')">
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
<script lang="ts" src="./HomeService"></script>
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
        display: none;
    }

    .delete-pane:hover > .delete-item{
        display: block;
    }

    .form-responsive{
        height: calc(100vh - 200px);
        overflow-y: auto;
    }
</style>