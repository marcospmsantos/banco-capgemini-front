import Api from '$services/api';

class Transacao extends Api {
	/**
	 * Método construtor, seta a BASE URL
	 * @param url
	 */
	constructor(url) {
		super(url);
	}
}
export default new Transacao('transacao');
