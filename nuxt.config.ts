import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
	/*  Shall server render pages (= universa app)? False means SPA. */
	ssr: false,

	css: [
		/*  Global css styles for this project, if any */
		// '@/assets/css/main.css'
	],

	modules: [
		/* Auto-include only used v-components & v-directives, aka "treeshaking" */
		/* As described in https://next.vuetifyjs.com/en/features/treeshaking/   */
		async (options, nuxt) => {
			nuxt.hooks.hook('vite:extendConfig', (config) => {
				config?.plugins?.push(
					vuetify({
						/* Use customized scss rules defined in settings.scss */
						styles: { configFile: 'assets/css/vuetify/settings.scss' },
					}),
				);
			});
		},

		/* Clean css output from unused classes */
		'nuxt-purgecss',
	],

	// Unsure why others use this? Keep here uncommented so far..
	// build: {
	// 	transpile: ['vuetify'],
	// },

	app: {
		/* http head content included in every generated page */
		head: {
			title: 'Vuetify 3 starter',
		},
	},
});

