import { useStorage } from "@vueuse/core";

const { log } = useLogs();

const areVisualizationsOn = useStorage("vue-app-visualize-all", false);
const areLayoutVisualizationsOn = useStorage("vue-app-visualize-layouts", false);
const areElementVisualizationsOn = useStorage("vue-app-visualize-elements", false);

log.info(() =>
	console.log(`✅ Initialized Visualize:`, {
		all: areVisualizationsOn.value ? "On" : "Off",
		layouts: areLayoutVisualizationsOn.value ? "On" : "Off",
		elements: areElementVisualizationsOn.value ? "On" : "Off",
	}),
);

watch([areLayoutVisualizationsOn, areElementVisualizationsOn], (newValues) => {
	areVisualizationsOn.value = !newValues.includes(false);

	log.info(() =>
		console.log(`✅ Visualizations changed. Status:`, {
			layouts: areLayoutVisualizationsOn.value ? "On" : "Off",
			elements: areElementVisualizationsOn.value ? "On" : "Off",
		}),
	);
});

const getRefs = () => {
	return {
		allOn: areVisualizationsOn,
		layoutsOn: areLayoutVisualizationsOn,
		elementsOn: areElementVisualizationsOn,
	};
};

const setAll = (val = false) => {
	console.log(`XXX setAllVisualizations(${val})`);
	areVisualizationsOn.value = val;
	areLayoutVisualizationsOn.value = val;
	areElementVisualizationsOn.value = val;
};

export function useVisualize() {
	return {
		allOn: areVisualizationsOn,
		layoutsOn: areLayoutVisualizationsOn,
		elementsOn: areElementVisualizationsOn,
		setAll,
		getRefs,
	};
}
