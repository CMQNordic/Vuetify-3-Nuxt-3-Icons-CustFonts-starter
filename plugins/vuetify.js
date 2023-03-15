import { createVuetify } from "vuetify";
import { mdi, aliases as allAliases } from "vuetify/iconsets/mdi-svg";
import "vuetify/styles"; // apply pre-build vuetify styles

const { log } = useLogs();

const aliases = {
	// Add used icon aliases here
	menu: allAliases.menu,
	close: allAliases.close,
	info: allAliases.info,
};

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		icons: {
			defaultSet: "mdi",
			aliases,
			sets: { mdi },
		},
	});

	nuxtApp.vueApp.use(vuetify);

	log.info(() => console.log("✅ Initialized Vuetify:", vuetify));
});
