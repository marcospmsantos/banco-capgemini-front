import Api from '$services/api';
import axios from 'axios';

class User extends Api {
	/**
	 * Método construtor, seta a BASE URL
	 * @param url
	 */
	constructor(url) {
		super(url);
	}

	/**
	 * Método existe apenas para tratar os retornos apropriados
	 * @param id
	 * @returns {Promise<{permissions, roles, user_roles, selected_roles, user, status}>}
	 */
	async find(id) {
		const { data, status } = await super.find(id);
		const { user, permissions, roles, selected_roles, user_roles } = data;
		return {
			user,
			permissions,
			roles,
			selected_roles,
			user_roles,
			status,
		};
	}

	/**
	 * Método específico para salvar avatar
	 * @param id
	 * @param form
	 * @param config
	 * @returns {Promise<{data: any, message: *, status: boolean}|{error: *, message: *, status: boolean}|*>}
	 */
	async saveAvatar(id, form, config) {
		try {
			return await axios
				.post(`${this.url}/${id}/avatar`, form, config)
				.then(res => {
					notification.showSuccess(res);
					return {
						status: true,
						data: res.response,
						message: res.message,
					};
				})
				.catch(err => {
					notification.showErrors(err);
					return {
						status: false,
						error: err.message,
						message: err.response.data.message,
					};
				});
		} catch (error) {
			return error;
		}
	}
}
export default new User('user');
