import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { Field, Form, ErrorMessage, configure, defineRule } from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { loadLocaleFromURL, localize } from '@vee-validate/i18n';

import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';

const app = createApp(App);

Object.keys(AllRules).forEach(rule => {
    defineRule(rule, AllRules[rule]);
  });

loadLocaleFromURL('../public/zh_TW.json');

configure({
    generateMessage: localize('zh_TW'),
    validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
  });

app.use(createPinia());
app.use(VueAxios, axios);

app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app');
