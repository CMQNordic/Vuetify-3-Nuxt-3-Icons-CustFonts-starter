import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // pre-build css styles

/* Add build-in icon used internally in various components */
/* https://next.vuetifyjs.com/en/features/icon-fonts/ */
import { mdi, aliases as allAliases } from 'vuetify/iconsets/mdi-svg';
const aliases = {
	/* Add used icon aliases here */
	menu: allAliases.menu,
	close: allAliases.close,
	info: allAliases.info,
};

/* All components and directives. For test & prototyping in dev only. */
//import * as components from 'vuetify/components';
//import * as directives from 'vuetify/directives';

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		//components,
		//directives,
		icons: {
			defaultSet: 'mdi',
			aliases,
			sets: { mdi },
		},
	});

	nuxtApp.vueApp.use(vuetify);

	if (!process.server) console.log('➡️ Initialized Vuetify object ', vuetify);
});

