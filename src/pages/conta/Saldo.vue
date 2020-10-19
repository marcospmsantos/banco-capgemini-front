<template>
	<v-card>
		<h1>Saldo da Conta</h1>
		<br />
		<div>
			<span>{{saldo}}</span>
		</div>
	</v-card>
</template>

<script>
import api from '$api/Conta';
export default {
	data: () => ({
		saldo: null
	}),
	mounted() {
		this.list();
	},
	methods: {
		async list() {
			const { data:{data} } = await api.getSaldo();
			this.saldo = data.saldo;
		},
	},
};
</script>
