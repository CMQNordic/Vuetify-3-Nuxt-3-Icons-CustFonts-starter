import { createVuetify } from 'vuetify';

// Add ALL prebuild styles. 
// We configure those with help of Vite & assets/css/vuetify/setting.scss. 
// Vite will load those before each of vuetify’s stylesheets.
// Described in https://next.vuetifyjs.com/en/features/sass-variables/#component-specific-variables
import 'vuetify/styles';

/* Import default SVG iconsets with corresponding aliases (including svg icons) */
/* Described in https://next.vuetifyjs.com/en/features/icon-fonts/ */
import { mdi, aliases } from 'vuetify/iconsets/mdi-svg';

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		ssr: false,
		icons: {
			defaultSet: 'mdi',
			aliases,
			sets: { mdi },
		},
	});

	nuxtApp.vueApp.use(vuetify);

	console.log('❤️ Initialized Vuetify 3');
});




