import Vue from 'vue';
import jquery from 'jquery';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';
import router from '~/router/index';
import store from './store';
import vuetify from './plugins/vuetify';
import passport from './plugins/passport';
import notification from './helper/notification';
import './plugins/axios';
import './components';

import helper from '~/services/helper';
import Form from '~/services/form';

import VCurrencyField from 'v-currency-field'
import { VTextField } from 'vuetify/lib'

var $ = jquery;
window.$ = $;

window.Form = Form;
window.axios = axios;
window.notification = notification;
window.helper = helper;
window._has = require('lodash/has');

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(passport);

Vue.component('v-text-field', VTextField);
Vue.use(VCurrencyField, { 
	locale: 'pt-BR',
	decimalLength: 2,
	autoDecimalMode: true,
	min: null,
	max: null,
	defaultValue: 0,
    valueAsInteger: false,
    allowNegative: false
});

Vue.mixin({
	methods: {},
});

export const app = new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');
