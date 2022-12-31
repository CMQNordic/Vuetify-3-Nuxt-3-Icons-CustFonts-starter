import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
	ssr: true,

	modules: [
		/* Vuetify treeshaking: https://next.vuetifyjs.com/en/features/treeshaking/ */
		async (_, nuxt) => {
			nuxt.hooks.hook('vite:extendConfig', (config) => {
				config?.plugins?.push(vuetify());
			});
		},

		/* Remove unused CSS */
		[
			'nuxt-purgecss',
			{
				content: [
					/* Copy of 'dist' from first npm run generate */
					'modules/purgecss/static-generated-html/**/*.html',
				],
				greedy: [
					/* Generated as runtime, keep all related selectors */
					/v-ripple/,
				],
			},
		],
	],

	build: {
		transpile: ['vuetify'],
	},

	/* Added for debug purposes whe testing minification */
	vite: {
		build: {
			/* Turn on/off minification of js */
			minify: true,
		},
	},

	postcss: {
		plugins: {
			/* Turn on/minification of css */
			cssnano: true,
		},
	},
});
