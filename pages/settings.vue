<script setup>
	const { log, refs, set } = useLogs();
	log.info(() => console.log(`✅ Initializing Settings page`));

	const infoLogsEnabled = ref(false);
	const errorLogsEnabled = ref(false);

	const { setAll, getRefs } = useVisualize();
	const refAllOn = getRefs().allOn;

	let logRefs = getLogRefsDefaults();

	function printConsoleLog(val = "info") {
		val == "info" ? log.info("This is a INFO log") : log.error("This is a ERROR log");
	}

	onMounted(() => {
		log.info(() => console.log(`✅ Settings page mounted`));
		infoLogsEnabled.value = refs.bInfo;
		errorLogsEnabled.value = refs.bError;
	});
</script>

<template>
	<v-btn color="green" :disabled="!infoLogsEnabled" @click="printConsoleLog('info')">
		log info to console
	</v-btn>

	<v-btn color="red" :disabled="!errorLogsEnabled" @click="printConsoleLog('error')">
		log error to console
	</v-btn>

	<v-switch
		color="green"
		density="compact"
		:hideDetails="true"
		v-model="refAllOn"
		@update:modelValue="setAll($event)"
		:label="`All Visualizations: ${refAllOn ? 'On' : 'Off'}`"
	/>

	<v-switch
		color="green"
		density="compact"
		:hideDetails="true"
		v-model="logRefs.areAllLogsOn.value"
		@update:modelValue="setAllLogs($event)"
		:label="`All logs: ${logRefs.areAllLogsOn.value ? 'On' : 'Off'}`"
	/>
</template>
