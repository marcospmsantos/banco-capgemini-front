import * as Component from './components';

export default [
	...applyRules(
		['guest'],
		[
			{
				path: '',
				component: Component.LayoutDefaultWrapper,
				redirect: { path: '/login' },
				children: [
					{
						path: '/login',
						component: Component.LayoutLogin,
						children: [{ path: '', name: 'login', component: Component.Login }],
					},
				],
			},
		]
	),

	...applyRules(
		['auth'],
		[
			{
				path: '',
				component: Component.LayoutDefault,
				children: [
					{ path: 'home', name: 'home', component: Component.Home },
				],
			},
			{
				path: '/conta',
				component: Component.LayoutDefault,
				children: [
					{
						path: 'saque',
						name: 'conta-saque',
						component: Component.ContaSaque,
					},
					{
						path: 'saldo',
						name: 'conta-saldo',
						component: Component.ContaSaldo,
					},
					{
						path: 'deposito',
						name: 'conta-deposito',
						component: Component.ContaDeposito,
					},
				],
			},
		]
	),
	{ path: '*', component: Component.NotFound },
];

function applyRules(rules, routes) {
	for (let i in routes) {
		routes[i].meta = routes[i].meta || {};

		if (!routes[i].meta.rules) {
			routes[i].meta.rules = [];
		}
		routes[i].meta.rules.unshift(...rules);

		if (routes[i].children) {
			routes[i].children = applyRules(rules, routes[i].children);
		}
	}

	return routes;
}
