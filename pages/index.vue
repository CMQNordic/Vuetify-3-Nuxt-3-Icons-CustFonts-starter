<script setup>
	const { log } = useLogs();
	log.info(() => console.log(`✅ Initializing Home page`));

	onMounted(() => {
		log.info(() => console.log(`✅ Home page mounted`));
	});
</script>

<template>
	<div class="elevation-5 text-center">
		<h1>I'm home page</h1>
	</div>
</template>
