<template>
	<v-card elevation="20">
		<v-card-title>
			<h2 class="ml-5 d-inline-block">{{ title }}</h2>
		</v-card-title>
		<v-container fill-height fluid grid-list-xl>
			<v-layout justify-center wrap>
				<v-flex xs12 md12>
					<div>
						<v-form>
							<v-container py-0>
								<v-layout wrap>
									<v-flex xs12 md6>
										<v-currency-field
											v-model="form.valor"
											label="Valor"
											required
											filled
											color="grey">
										</v-currency-field>
										<show-error :form-name="form" prop-name="valor"></show-error>
									</v-flex>
								</v-layout>
							</v-container>
						</v-form>
					</div>
				</v-flex>
			</v-layout>
		</v-container>
		<v-container fluid grid-list-xl>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="success" @click="salvar">Enviar Solicitação</v-btn>
			</v-card-actions>
		</v-container>
	</v-card>
</template>
<script>
import api from '$api/Transacao';

export default {
	props: {
		title: {
			value: {
				default: '',
			},
		},
		redirect: {
			value: {
				default: 'conta-saldo',
			},
		},
	},
	data: () => ({
		done: false,
		form: new Form({
			valor: '',
		}),
	}),
	mounted() {
		this.done = true;
	},
	methods: {
		async salvar() {
			if (this.$route.name === 'conta-deposito') {
				const { status, data } = await api.efetuarDeposito(this.form);
			
				if (status === true) {
					this.$emit('handle-success');
				}
			} else {
				const { status, data } = await api.efetuarSaque(this.form);
			
				if (status === true) {
					this.$emit('handle-success');
				}
			}
		},
	},
};
</script>
