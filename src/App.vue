<template>
  <div class="wrapper" v-if="isSettingPage()">
    <LayoutComponent />
    <div class="content-wrapper">
      <router-view />
    </div>

    <footer class="main-footer">
      <div class="float-right d-none d-sm-block">
        <b>Version</b> 1.0.0
      </div>
      <strong>Copyright &copy;<a href="#">Numberskills</a>.</strong> All rights reserved.
    </footer>
  </div>
  <div v-else>
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import LayoutComponent from './components/common/LayoutComponent.vue';
export default defineComponent({
  components:{
    LayoutComponent
  },
  mounted() {
  },
  methods:{
    isSettingPage(){
      return this.$route.path != '/register' 
      && this.$route.path != '/login'  
      && this.$route.path != '/forget-password';
    }
  }
});
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
@import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-navigations/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-notifications/styles/material.css";
</style>
