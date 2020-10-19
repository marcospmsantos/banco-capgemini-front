<template>
	<v-list dense>
		<v-toolbar flat class="transparent">
			<v-list class="pe-0">
				<v-list-item>
					<v-list-item-avatar>
						<img :src="getUserAvatar()" />
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>
							{{ this.user.name }}
						</v-list-item-title>
						<v-list-item-title>
							Ag: {{ this.user.numero_agencia }}
						</v-list-item-title>
						<v-list-item-title>
							Conta: {{ this.user.numero_conta }}
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-toolbar>
		<v-divider />
		<template v-for="item in items">
			<v-row v-if="item.heading" :key="item.heading" row align="center"></v-row>
			<v-list-group
				v-else-if="item.children"
				:key="item.text"
				v-model="item.model"
				:prepend-icon="item.model ? item.icon : item['icon-alt']"
				append-icon=""
				color="black"
			>
				<template v-slot:activator>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>
								{{ item.text }}
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</template>
				<v-list-item
					v-for="(child, i) in item.children"
					:key="i"
					ripple
					:to="child.route"
					exact
				>
					<v-list-item-action v-if="child.icon">
						<v-icon>{{ child.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>
							{{ child.text }}
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-group>
			<v-list-item v-else :key="item.text" ripple :to="item.route" exact rounded>
				<v-list-item-action>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>
						{{ item.text }}
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</template>
	</v-list>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'SideBarMenu',
	computed: {
		...mapGetters({
			user: 'auth/user',
		}),
	},
	data: () => ({
		items: [
			{ icon: 'home', text: 'Home', route: '/home' },
			{ icon: 'person', text: 'Saldo', route: '/conta/saldo' },
			{ icon: 'work', text: 'Saque', route: '/conta/saque' },
			{ icon: 'gavel', text: 'Depósito', route: '/conta/deposito' },
		],
	}),
	methods: {
		toSite(url) {
			window.open(url, '_blank');
		},
		/**
		 * Busca a foto do usuário
		 * @returns {*}
		 */
		getUserAvatar() {
			return 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Kurt&hairColor=Blonde&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light';
		},
	},
};
</script>

<style scoped></style>
