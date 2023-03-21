<script setup>
	const { log } = useLogs();
	log.info(() => console.log(`✅ Initializing About page`));

	onMounted(() => log.info(() => console.log(`✅ About page mounted`)));
</script>

<template>
	<!-- About page -->
	<v-card class="elevation-5 text-center">
		<h1>This is About page</h1>
		<p class="py-2">Built Vue3 & Vuetify3</p>
		<p>Bundle size with purgecss: css[371kB(46kB)] js[505kB(128kB)]</p>
		<p>Bundle size without purgecss: css[371kB(46kB)] js[505kB(128kB)]</p>
	</v-card>
</template>
