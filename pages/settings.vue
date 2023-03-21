<script setup>
	const isMounted = ref(false);
	onMounted(() => {
		isMounted.value = true;
		test.value = bool.bAllLogs.value;
	});

	const {
		bool: { bVisualizeAll },
		setVisualize,
	} = useVisualize();

	const { log, bool, setLog } = useLogs("settings");
	/* Following values are client side only. 	  */
	/* Read afterMounted to avoid hydration error. */
	const test = ref(false);
	const bAllLogs = computed(() => isMounted.value && bool.bAllLogs.value);
	const bInfoLogs = computed(() => isMounted.value && bool.bInfoLogs.value);
	const bDebugLogs = computed(() => isMounted.value && bool.bDebugLogs.value);
	const bErrorLogs = computed(() => isMounted.value && bool.bErrorLogs.value);
	const bTodoLogs = computed(() => isMounted.value && bool.bTodoLogs.value);

	const commonSwitchProperties = {
		color: "green",
		density: "compact",
		"hide-details": true,
	};

	log.info(() => console.log(`✅ Initializing Settings page`));
</script>

<template>
	<div>
		<v-btn color="green" :disabled="!bInfoLogs" @click="log.info('This is a INFO log')">
			console info log
		</v-btn>
		<v-btn color="red" :disabled="!bErrorLogs" @click="log.error('This is a ERROR log')">
			console error log
		</v-btn>
	</div>

	<v-switch
		v-bind="commonSwitchProperties"
		v-model="bAllLogs"
		@update:modelValue="setLog($event, 'all')"
		:label="`All logs: ${bAllLogs ? 'On' : 'Off'}`"
	/>

	<v-switch
		v-bind="commonSwitchProperties"
		v-model="bInfoLogs"
		@update:modelValue="setLog($event, 'info')"
		:label="`Info: ${bInfoLogs ? 'On' : 'Off'}`"
	/>

	<v-switch
		v-bind="commonSwitchProperties"
		v-model="bDebugLogs"
		@update:modelValue="setLog($event, 'debug')"
		:label="`Debug: ${bDebugLogs ? 'On' : 'Off'}`"
	/>

	<v-switch
		v-bind="commonSwitchProperties"
		v-model="bErrorLogs"
		@update:modelValue="setLog($event, 'error')"
		:label="`Error: ${bErrorLogs ? 'On' : 'Off'}`"
	/>

	<v-switch
		v-bind="commonSwitchProperties"
		v-model="bTodoLogs"
		@update:modelValue="setLog($event, 'todo')"
		:label="`Todo: ${bTodoLogs ? 'On' : 'Off'}`"
	/>

	<v-switch
		v-bind="commonSwitchProperties"
		v-model="bVisualizeAll"
		@update:modelValue="setVisualize($event, 'all')"
		:label="`All Visualizations: ${bVisualizeAll ? 'On' : 'Off'}`"
	/>
</template>
