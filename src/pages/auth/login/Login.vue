<template>
	<div id="app">
		<v-app>
			<v-content>
				<v-container>
					<v-card class="mx-auto my-12 outer-card" max-width="374">
						<v-form v-model="valid">
							<v-card-title>
								<v-card class="v-header py-2 mx-auto my-n12" max-width="415" raised>
									<v-card-title>
										<v-row justify="center" color="white">
											<v-avatar size="140">
												<img :src="getAvatarLogo()" alt="logo-banco-capgemini" />
											</v-avatar>
										</v-row>
									</v-card-title>
								</v-card>
							</v-card-title>
							<br />
							<v-card-text class="my-4">
								<v-text-field
									prepend-icon="mdi-email"
									label="E-mail"
									name="name"
									type="text"
									v-model="form.email"
								></v-text-field>
								<v-text-field
									id="password"
									label="Senha"
									name="pass"
									prepend-icon="mdi-lock"
									type="password"
									v-model="form.password"
								></v-text-field>
								<v-card-actions>
									<v-row justify="center">
										<v-btn normal text color="primary" @click="login()"> Entrar </v-btn>
									</v-row>
								</v-card-actions>
								<br />
								<v-btn @click="preencherAdmin">Conta Teste</v-btn>
							</v-card-text>
						</v-form>
					</v-card>
				</v-container>
			</v-content>
		</v-app>
	</div>
</template>
<script>
import Form from 'vform';
import logo from '~/assets/logo.png';

export default {
	data: () => ({
		valid: false,
		emailRules: [
			v => !!v || 'E-mail é obrigatório',
			v => /.+@.+/.test(v) || 'Precisa ser um e-mail válido',
		],
		passwordRules: [v => !!v || 'Senha é obrigatória'],
		email: '',
		form: new Form({
			email: '',
			password: '',
		}),
	}),
	methods: {
		async login() {
			if (!this.valid) {
				return;
			}
			const requestData = {
				grant_type: process.env.VUE_APP_GRANT_TYPE,
				client_id: process.env.VUE_APP_CLIENT_ID,
				client_secret: process.env.VUE_APP_CLIENT_SECRET,
				scope: '',
			};

			const data = Object.assign(requestData, {
				username: this.form.email,
				password: this.form.password,
			});

			await axios
				.post('/oauth/token', data)
				.then(async res => {
					await this.$store.dispatch('auth/setToken', res.data);
					await this.$store.dispatch('auth/setCheck', true);
					await this.$store.dispatch('auth/fetchUser');
					const { name } = await this.$store.getters['auth/user'];
					notification.showInfoMsg(`Bem vindo, ${name}`);
					this.$router.push({ name: 'home' });
				})
				.catch(err => {
					notification.showErrors({ message: 'Credenciais inválidas' });
				});
		},
		preencherAdmin() {
			this.form.email = 'admin@user.com';
			this.form.password = '123456';
		},
		getAvatarLogo() {
			return logo;
		},
	},
};
</script>
<style>
.v-header {
	background-image: linear-gradient(60deg, #3c5a99, #3c5a99);
	text-align: center;
	width: 100%;
	margin-top: -40px;
}
h4 {
	font-family: 'Times New Roman', Times, serif;
	color: white;
}
.outer-card {
	border-radius: 8px !important;
}
.v-input__icon--prepend .v-icon {
	color: black;
}
</style>
