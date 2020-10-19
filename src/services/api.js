import axios from 'axios';
import Swal from 'sweetalert2';

export default class Api {
	/**
	 * Método construtor
	 * @param url
	 */
	constructor(url) {
		this.url = url;
	}

	/**
	 * Retorna saldo da conta
	 * @returns {Promise<T|{description: *, error: *, status: boolean}|*>}
	 */
	async getSaldo() {
		try {
			return await axios
				.get(`${this.url}`)
				.then(res => {
					return {
						status: true,
						data: res.data,
					};
				})
				.catch(err => {
					notification.showErrors(err);
					return {
						status: false,
					};
				});
		} catch (error) {
			return error;
		}
	}

	/**
	 * Salva a transacao para saque
	 * @param form
	 * @returns {Promise<{data: any, message: *, status: *}|{description: *, error: *, status: boolean}|*>}
	 */
	async efetuarSaque(form) {
		try {
			return await form
				.post(this.url + '/saque')
				.then(res => {
					this.confirmTransaction(res.response.id);
					// notification.showSuccess(res);
					// return {
					// 	status: true,
					// 	data: res.response,
					// 	message: res.message,
					// };
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

	/**
	 * Salva a transacao para deposito
	 * @param form
	 * @returns {Promise<{data: any, message: *, status: *}|{description: *, error: *, status: boolean}|*>}
	 */
	async efetuarDeposito(form) {
		try {
			return await Swal.fire({
				title: 'Confirmação',
				text: 'Confirma o valor a ser depositado?',
				type: 'warning',
				showCancelButton: true,
				cancelButtonText: 'Cancelar',
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Sim',
			}).then(async result => {
				if (result.value) {
					return await form
						.post(this.url + '/deposito')
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
				} else {
					return {
						status: false,
					};
				}
			});
		} catch (error) {
			return error;
		}
	}

	/**
	 * Atualizar transação
	 * @param id
	 * @returns {Promise<T|T>}
	 */
	async confirmTransaction(id) {
		return await Swal.fire({
			title: 'Confirmação',
			text: 'Deseja confirmar essa operação?',
			type: 'warning',
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Confirmar',
		}).then(async result => {
			console.log(result);
			if (result.value) {
				return await axios
					.put(`${this.url}/confirmacao/${id}`)
					.then(res => {
						console.info(res, 'res');
						if (res.data.status === 'success') {
							Swal.fire('Transação realizada com sucesso!', '', 'success');
							return {
								status: true,
							};
						} else {
							Swal.fire('Transação não realizada', '', 'error');
							return {
								status: false,
							};
						}
					})
					.catch(err => {
						console.info(err, 'err');
						notification.showErrors(err);
					});
			} else {
				this.cancelTransaction(id);
			}
		});
	}

	async cancelTransaction(id) {
		try {
			return await axios
				.patch(`${this.url}/cancelar/${id}`)
				.then(res => {
					notification.showSuccess(res);
					return {
						status: true,
					};
				})
				.catch(err => {
					notification.showErrors(err);
					return {
						status: false,
					};
				});
		} catch (error) {
			return error;
		}
	}

	/**
	 * Busca os pré-requisitos da entidade
	 * @returns {Promise<T|{description: *, error: *, status: boolean}|{description: null, error: *, status: boolean}>}
	 */
	async preRequisite() {
		try {
			return await axios
				.get(`${this.url}/pre-requisite`)
				.then(res => {
					return {
						status: res.status,
						data: res.data,
					};
				})
				.catch(err => {
					notification.showErrors(err);
					return {
						status: false,
						error: err.message,
						description: err.response.data.message,
					};
				});
		} catch (error) {
			return {
				status: false,
				error: error,
				description: null,
			};
		}
	}
}
