<template>
	<form-self
		@handle-success="toList"
		title="Efetuar Depósito"
	></form-self>
</template>

<script>
import FormSelf from './Form';

export default {
	components: { FormSelf },
	methods: {
		toList() {
			this.$router.push({ name: 'conta-saldo' });
		},
	},
};
</script>
