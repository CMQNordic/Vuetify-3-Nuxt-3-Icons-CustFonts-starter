<template>
	<div>
		<v-app>
			<v-navigation-drawer temporary v-model="showDrawer" location="right">
				<div class="w-100 text-right">
					<v-btn flat icon="$close" size="x-large" @click="usedToggle()" />
				</div>
				<p class="text-center"><b>I'm the drawer</b></p>
			</v-navigation-drawer>

			<v-app-bar>
				<v-app-bar-nav-icon @click="usedToggle()" />
				<v-toolbar-title>I'm the header</v-toolbar-title>
			</v-app-bar>

			<v-main class="d-flex align-center">
				<v-container>
					<v-sheet elevation="4" class="py-4 text-center">
						<h1 class="text-h5">Styled with text-h5</h1>
						<p>Default text in a paragraph</p>
						<v-btn class="mt-4">press me</v-btn>
					</v-sheet>
				</v-container>
			</v-main>

			<v-footer app elevation="6">
				<v-row no-gutters class="justify-center text-overline font-weight-black">
					<p class="my-auto">I'm the footer</p>
					<v-spacer />
					<v-btn icon variant="plain"><v-icon icon="$info" color="green-accent-4" /></v-btn>
				</v-row>
			</v-footer>
		</v-app>
	</div>
</template>

<script setup>
	const showDrawer = ref(false);

	const usedToggle = () => {
		console.log('usedToggle()');
		showDrawer.value = !showDrawer.value;
	};

	/* Redundant unused code just for test purposes later on. */
	const unusedFunction = () => console.log('unusedFunction()');
</script>

<style>
	/* Redundant unused code just for test purposes later on. */
	.unused-selector {
		color: orange;
	}
</style>

