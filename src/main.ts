import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import withUUID from "vue-uuid";

import './plugins/fontawesome-free/css/all.min.css';
import './plugins/icheck-bootstrap/icheck-bootstrap.min.css';
import './dist/css/adminlte.min.css';
import './plugins/jquery/jquery.min.js';
import './plugins/bootstrap/js/bootstrap.bundle.min.js';
import './dist/js/adminlte.min.js';
import './style.css';

import i18n from './i18';
import * as ej2 from '@syncfusion/ej2-base';
import { enableRipple } from '@syncfusion/ej2-base';
import lodash from 'lodash';
import { ToastPlugin } from "@syncfusion/ej2-vue-notifications";
import { createPinia } from 'pinia';

ej2.validateLicense('ORg4AjUWIQA/Gnt2VlhhQlJCfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5adERjX35cdHNQQGZc');
enableRipple(true);

const app = withUUID(createApp(App));

app.config.errorHandler = (error,instance,info)=>{
    console.log(error);
    console.log(instance);
    console.log(info);
  }

createApp(App)
.use(createPinia())
.use(router)
.use(i18n)
.use(lodash)
.use(ToastPlugin)
.mount('#app')
