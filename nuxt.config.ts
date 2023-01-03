import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
	ssr: true,

	modules: [
		/* Vuetify treeshaking */
		/* https://next.vuetifyjs.com/en/features/treeshaking/ */
		async (_, nuxt) => {
			nuxt.hooks.hook('vite:extendConfig', (config) => {
				config?.plugins?.push(vuetify());
			});
		},

		/* Remove unused CSS */
		/* https://github.com/Developmint/nuxt-purgecss */
		[
			'nuxt-purgecss',
			{
				enabled: true, // Always enable purgecss
				content: [
					/* Scan copy of 'dist' from previous npm run generate */
					'modules/purgecss/static-generated-html/**/*.{html,vue,jsx?,tsx?}',
				],
				greedy: [
					/* Generated at runtime, keep all related selectors */
					/v-ripple/,
				],
			},
		],
	],

	build: {
		transpile: ['vuetify'],
	},

	/* Added for debuging purposes when testing minification */
	vite: {
		build: {
			/* Turn on/off minification of js */
			minify: true,
		},
	},

	postcss: {
		plugins: {
			/* Turn on/off minification of css */
			cssnano: true,
		},
	},
});
