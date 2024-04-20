<template>
    <div class="container-fluid mt-2">
        <div class="card card-body">
            <div class="form-group row">
                <label for="pageSelect" class="col-md-1 col-form-label">{{ 'Page' }}:</label>
                <div class="col-md-4">
                    <select class="form-control input-sm" @change="pageChange($event)">
                        <option value="0">{{ 'Select Page' }}</option>
                        <option v-for="(item,index) in pages" :key="index"  :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
            </div>
            <div class="row mt-2">
                <template v-for="(item,index) in pageInputs" :key="index">
                    <div class="col-md-12">
                        <div class="form-group input-field">
                            <label :for="item.id">{{ item.title }}</label>
                            <input :type="item.fieldType" :name="item.title" :id="item.id" v-model="item.value" :placeholder="item.placeHolder" class="form-control input-sm" />
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