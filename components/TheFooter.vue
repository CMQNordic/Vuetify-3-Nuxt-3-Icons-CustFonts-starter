<script setup>
	const url =
		"https://dev.to/czerma/how-to-build-optimized-vuetify-3-nuxt-3-project-4l5k";
</script>

<template>
	<!-- FOOTER -->
	<v-footer app elevation="6" class="ma-0 py-0 px-4" :class="{ visualizeLayouts: true }">
		<v-app-bar-title>I'm the Footer.</v-app-bar-title>

		<v-spacer />

		<p class="my-auto">
			Read
			<a target="_blanc" href="url"> HERE </a>
			about how I was built
		</p>

		<v-btn icon variant="plain">
			<v-icon icon="$info" color="green-accent-4" />
		</v-btn>
	</v-footer>
</template>
