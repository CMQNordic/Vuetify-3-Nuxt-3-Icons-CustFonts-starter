<template>
	<v-app>
		<TheHeader />
		<TheMain>
			<NuxtPage />
		</TheMain>
		<TheFooter />
	</v-app>
</template>

<style>
	/* GLOBAL UNUSED SELECTOR. To test treeshaking. This should never exist in production bundle. */
	.unused-selector-app {
		background-color: black;
		color: orange;
		font-size: 1rem;
	}
</style>
