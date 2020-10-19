import 'sweetalert2/dist/sweetalert2.min.css';

import Vue from 'vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader
import Vuetify, {
	VSnackbar,
	VIcon,
	VBtn,
	VAvatar,
	VProgressCircular,
} from 'vuetify/lib';

import VueSweetalert2 from 'vue-sweetalert2';
import VuetifyToast from 'vuetify-toast-snackbar';
import VueTheMask from 'vue-the-mask';

Vue.use(VueSweetalert2);
Vue.use(VueTheMask);

Vue.use(Vuetify, {
	components: { VSnackbar, VIcon, VBtn, VAvatar, VProgressCircular },
});

Vue.use(VuetifyToast, {
	x: 'right', // default
	y: 'top', // default
	color: 'info', // default
	iconColor: '', // default
	classes: ['body-2'],
	timeout: 6000,
	dismissable: true,
	showClose: true,
	icon: 'info',
});

export default new Vuetify({
	icons: {
		iconfont: 'mdi',
	},
});
