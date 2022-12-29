import vuetify from 'vite-plugin-vuetify';
import purgeConfig from './modules/purgecss/config';

export default defineNuxtConfig({
	ssr: true,

	modules: [
		/* Vuetify treeshaking: https://next.vuetifyjs.com/en/features/treeshaking/ */
		async (_, nuxt) => {
			nuxt.hooks.hook('vite:extendConfig', (config) => {
				config?.plugins?.push(vuetify());
			});
		},

		['nuxt-purgecss', purgeConfig] /* Remove unused CSS */,
	],

	build: {
		transpile: ['vuetify'],
	},
});

