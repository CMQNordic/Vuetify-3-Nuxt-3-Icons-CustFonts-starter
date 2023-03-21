import { useStorage } from "@vueuse/core";
import { info, debug, error, assert, TODO } from "@/composables/useLogs.js ";

const bVisualizeAll = useStorage("vue-app-visualize-all", false);
const bVisualizeElements = useStorage("vue-app-visualize-frame", false);
const bVisualizeLayouts = useStorage("vue-app-visualize-layouts", false);

info(() =>
	console.log(`✅ Initialized Visualize:`, {
		all: bVisualizeAll.value ? "On" : "Off",
		frame: bVisualizeElements.value ? "On" : "Off",
		layouts: bVisualizeLayouts.value ? "On" : "Off",
	}),
);

watch([bVisualizeLayouts, bVisualizeElements], (newValues) => {
	bVisualizeAll.value = !newValues.includes(false);

	info(() =>
		console.log(`✅ Visualizations changed. Status:`, {
			layouts: bVisualizeLayouts.value ? "On" : "Off",
			frame: bVisualizeElements.value ? "On" : "Off",
		}),
	);
});

const setVisualize = (val = false, type = "all") => {
	console.log(`XXX setAllVisualizations(${val})`);
	if (type == "all") {
		bVisualizeAll.value = val;
		bVisualizeLayouts.value = val;
		bVisualizeElements.value = val;
	} else if (type == "layouts") {
		bVisualizeLayouts.value = val;
	} else if (type == "element") {
		bVisualizeElements.value = val;
	}
};

const visualizeLayout = computed(() => {
	return bVisualizeLayouts.value
		? {
				"background-color": "hsla(195, 85%, 48%, 0.4) !important",
				border: "1px solid rgb(49, 71, 77) !important",
		  }
		: null;
});

const visualizeElement = computed(() => {
	return bVisualizeElements.value
		? {
				outline: "1px dotted lightcoral !important",
				backgroundColor: "hsla(0, 86%, 83%, 0.15) !important",
		  }
		: null;
});

export function useVisualize() {
	return {
		visualizeLayout,
		visualizeElement,
		bool: {
			bVisualizeAll,
			bVisualizeLayouts,
			bVisualizeElements,
		},
		setVisualize,
	};
}
