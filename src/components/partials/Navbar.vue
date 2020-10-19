<template>
	<v-app-bar
		:clipped-left="$vuetify.breakpoint.lgAndUp"
		app
		color="#3C5A99"
		elevation="20"
	>
		<v-toolbar-title style="width: 300px;" class="ml-0 pl-4">
			<v-avatar size="65">
				<img
					@click.stop="emitToogle()"
					:src="getAvatarLogo()"
					alt="banco-capgemini"
				/>
			</v-avatar>
			<v-app-bar-nav-icon
				class="white--text"
				@click.stop="emitToogle()"
			></v-app-bar-nav-icon>
			<span class="hidden-sm-and-down white--text"></span>
		</v-toolbar-title>
		<div class="flex-grow-1"></div>
		
		<v-menu offset-y>
			<template v-slot:activator="{ on }">
				<v-btn icon v-on="on">
					<v-avatar size="45px">
						<img :src="getUserAvatar()" />
					</v-avatar>
				</v-btn>
			</template>
			<v-list>
				<v-list-item @click="logout">
					<v-list-item-title>Sair</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import logo from '~/assets/logo.png';

export default {
	name: 'Navbar',
	data: () => ({
		items: [],
		name: '',
		menu: false,
	}),
	props: ['mini'],
	computed: mapGetters({
		auth: 'auth/user',
	}),
	mounted() {
		this.name = this.auth.name;
	},
	methods: {
		async logout() {
			const { name } = this.auth;
			await this.$store.dispatch('auth/logout');
			notification.showInfoMsg(`Volte sempre, ${name}`);
			this.$router.push({ name: 'login' });
		},
		getUserAvatar() {
			return 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Kurt&hairColor=Blonde&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light';
		},
		getAvatarLogo() {
			return logo;
		},
		emitToogle() {
			this.$emit('toggleNavigation');
		},
	},
};
</script>
