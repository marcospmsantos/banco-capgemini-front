import Api from '$services/api';

class Conta extends Api {
	/**
	 * Método construtor, seta a BASE URL
	 * @param url
	 */
	constructor(url) {
		super(url);
	}
}
export default new Conta('saldo');
