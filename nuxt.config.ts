import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
	/* Build mode
		true + generate  => generates static files, SSG, each page full static  
		false + generate => generates static files, SPA, first page empty + big scripts 
		true + build =>  ... 
		false + build => ... 
		https://nuxt.com/docs/guide/concepts/rendering/ */
	ssr: true,

	/* Global styles
		https://nuxt.com/docs/api/configuration/nuxt-config/#css 
	*/
	css: ["@/assets/css/main.css"],

	/* External modules: https://nuxt.com/modules */
	modules: [
		/* Vuetify
		 *
		 *	Dependency: vuetify & vite-plugin-vuetify
		 *	https://next.vuetifyjs.com/en/features/treeshaking/
		 */
		async (options, nuxt) => {
			nuxt.hooks.hook("vite:extendConfig", (config) => {
				config?.plugins?.push(
					vuetify({
						autoImport: true, // Autoimport components (def true)
					}),
				);
			});
		},

		/* Remove unused CSS: https://github.com/Developmint/nuxt-purgecss */
		[
			"nuxt-purgecss",
			{
				//enabled: false, // false disables purgecss
				content: [
					/* Copy 'dist' from previous run generate into this folder 	*/
					/* PurgeCss will scan the files and know what css to keep 	*/
					"modules/purgecss/static-generated-html/**/*.{html,vue,jsx?,tsx?}",
				],
				greedy: [
					/* Generated at runtime, keep all related selectors */
					/v-ripple/,
				],
			},
		],

		/* VueUse composables: https://vueuse.org/functions.html  */
		["@vueuse/nuxt", {}],
	],

	/* Build (nuxt) configuration
	  	https://nuxt.com/docs/api/configuration/nuxt-config#build 
	*/
	build: {
		/* transpile with Babel */
		transpile: ["vuetify"],
	},

	/* Vite configuration: 
		https://nuxt.com/docs/api/configuration/nuxt-config#vite 
	*/
	vite: {
		build: {
			/* used minifier when transpiling (def "esbuild", false = disable) 	
			   https://vitejs.dev/config/build-options.html#build-minify */
			minify: "esbuild",
			/* Size reporting for gzip-compressed files. 
				Disabling may increase build performance in large projects (def true) 
				https://vitejs.dev/config/build-options.html#build-reportcompressedsize */
			reportCompressedSize: false,
		},

		esbuild: {
			drop: [
				"debugger",
				"console",
			] /* removes ALL console.xxx including ALL parameters */,
		},
	},

	postcss: {
		plugins: {
			/* css minification (def true), */
			cssnano: true,
		},
	},
});
