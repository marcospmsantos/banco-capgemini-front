import store from '../store';
import { mapGetters } from 'vuex';
// import {app} from '~/app'

mapGetters({
	auth: 'user',
});

export default {

	/**
	 * Retorna parâmetros do usuário logado
	 * @param name
	 */
	getUserParam(name) {
		let user = store.getters['auth/user'];
		if (user && user.hasOwnProperty(name)) {
			return user[name];
		}
		return '';
	},

	/**
	 * Retorna usuário logado
	 */
	getAuthUser() {
		return store.getters['auth/user'];
	},

	/**
	 * Retorna nome do usuário logado
	 */
	getUserName() {
		return this.getUserParam('name');
	},

	/**
	 * Retorna o id do usuário logado
	 */
	getUserId() {
		return this.getUserParam('id');
	},

	/**
	 * Retorna foto do usúario logado
	 */
	getUserAvatar() {
		return this.getUserParam('photo_url');
	},

	/**
	 * Mostra apenas um erro
	 * @param error
	 */
	showError(msg) {
		app.$toast.error(msg);
	},

	/**
	 * Mostra apenas uma mensagem de sucesso
	 * @param msg
	 */
	showSuccessMsg(msg) {
		app.$toast.success(msg);
	},

	/**
	 * Mostra warnings
	 * @param msg
	 */
	showWarning(msg) {
		app.$toast.warning(msg);
	},

	showInfoMsg(msg) {
		app.$toast.info(msg);
	},

	/**
	 * Mostra mensagem de sucesso
	 * @param success
	 */
	showSuccess(success) {
		if (success.hasOwnProperty('message')) {
			if (success.status == 'success') {
				this.showSuccessMsg(success.message);
				return;
			}
		}

		if (success.data.hasOwnProperty('message')) {
			if (success.data.status == 'success') {
				this.showSuccessMsg(success.data.message);
				return;
			}
		}
	},

	/**
	 * Trata o array de erros do serve
	 * @param arrayErros
	 */
	showErrors(error) {
		/**
		 * Se for apenas um erro, mostra o único
		 */
		if (error.hasOwnProperty('data') && error.data.hasOwnProperty('error')) {
			if (error.data.error.hasOwnProperty('message')) {
				this.showError(error.data.error.message);
			}
			return;
		}

		/**
		 * Se tiver paenas a mensagem, então motra a mensagem!
		 */
		if (error.hasOwnProperty('message')) {
			if (error.status == 'error') {
				this.showError(error.message);
			}
			return;
		}

		/**
		 * Se for vários errors, então varre o array e mostra todos
		 */
		if (error.hasOwnProperty('data') && error.data.hasOwnProperty('errors')) {
			if (error.data.errors.hasOwnProperty('message')) {
				error.data.errors.message.map(error => {
					this.showError(error);
				});
			}
			return;
		}

		/**
		 * Se for vários errors, então varre o array e mostra todos
		 */
		if (error.hasOwnProperty('errors')) {
			if (error.errors.hasOwnProperty('message')) {
				error.errors.message.map(error => {
					this.showError(error);
				});
			}
			return;
		}

		/**
		 * Se não existir a propriedade error, então verifica se existe a propriedade message
		 * Questão de autorização do  usuário
		 */
		if (error.hasOwnProperty('data') && error.data.hasOwnProperty('message')) {
			this.showError(error.data.message);
		}
	},

	/**
	 * Retorna a mensagem de error de permissão ao usuário
	 */
	notPermission() {
		this.showWarning(
			'Desculpe, mas você não tem permissão para realizar essa ação'
		);
		return;
	},

	/**
	 * Verificação do usuário
	 * @returns {Promise<string>}
	 */
	check() {
		return axios
			.post('/api/auth/check')
			.then(res => {
				if (res.data.authenticated === true) {
					store.dispatch('setUser');
				} else {
					store.dispatch('resetAuthUserDetail');
				}
				return res.data.authenticated;
			})
			.catch(error => {
				store.dispatch('resetAuthUserDetail');
				return false;
			});
	},

	/**
	 * Usuário está autenticado?
	 * @returns {getters.getAuthStatus}
	 */
	isAuth() {
		return store.getters.getAuthStatus;
	},

	/**
	 * Remover o token do usuario no backend
	 */
	logout() {
		return axios.post('/api/auth/logout');
	},

	/**
	 * Função que retornar a logotipo do sistema.
	 */
	getAvatarLogo() {
		return '../assets/logo.png';
	},

	// to append filter variables in the URL
	getFilterURL(data) {
		let url = '';
		$.each(data, function (key, value) {
			url += value ? '&' + key + '=' + encodeURI(value) : '';
		});
		return url;
	},

	// to get date in desired format
	formatDate(date) {
		if (!date) return;

		return moment(date).format(this.getConfig('date_format'));
	},

	// to get date time in desired format
	formatDateTime(date) {
		if (!date) return;
		var date_format = this.getConfig('date_format');
		var time_format = this.getConfig('time_format');

		return moment(date).format(date_format + ' ' + time_format);
	},

	// to get time from now
	formatDateTimeFromNow(datetime) {
		if (!datetime) return;
		return moment(datetime).fromNow();
	},

	formatDateDiff(dateBegin, dateEnd) {
		var a = moment(dateBegin);
		var b = moment(dateEnd);

		return a.diff(b, 'days');
	},

	// to change first character of every word to upper case
	ucword(value) {
		if (!value) return;

		return value.toLowerCase().replace(/\b[a-z]/g, function (value) {
			return value.toUpperCase();
		});
	},

	// to change string into human readable format
	toWord(value) {
		if (!value) return;

		value = value.replace(/-/g, ' ');
		value = value.replace(/_/g, ' ');

		return value.toLowerCase().replace(/\b[a-z]/g, function (value) {
			return value.toUpperCase();
		});
	},

	// returns error message for axios request
	fetchDataErrorMsg(error) {
		return error.response.data.errors.message[0];
	},

	// round numbers as given precision
	roundNumber(number, precision) {
		precision = Math.abs(parseInt(precision)) || 0;
		var multiplier = Math.pow(10, precision);
		return Math.round(number * multiplier) / multiplier;
	},

	// round numbers as given precision
	formatNumber(number, decimal_place) {
		if (decimal_place === undefined) decimal_place = 2;
		return this.roundNumber(number, decimal_place);
	},

	// fill number with padding
	formatWithPadding(n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	},

	// generates random string of certain length
	randomString(length) {
		if (length === undefined) length = 40;
		var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var result = '';
		for (var i = length; i > 0; --i)
			result += chars[Math.floor(Math.random() * chars.length)];
		return result;
	},
};
