<template>
	<div>
		<v-app>
			<v-navigation-drawer temporary v-model="showDrawer" location="right">
				<div class="w-100 text-right">
					<v-btn flat icon="$close" size="x-large" @click="toggle" />
				</div>
				<p class="text-center"><b>I'm the drawer</b></p>
			</v-navigation-drawer>

			<v-app-bar>
				<v-app-bar-nav-icon @click="toggle" />
				<v-toolbar-title>I'm the Header</v-toolbar-title>
			</v-app-bar>

			<v-main class="d-flex align-center">
				<v-container>
					<v-sheet elevation="4" class="py-4 text-center">
						<p class="text-h5">Built and styled with Vuetify 3</p>
						<p>Minimized production bundle (70kB in tot)</p>
						<v-btn class="mt-4">press me to ripple</v-btn>
					</v-sheet>
				</v-container>
			</v-main>

			<v-footer app elevation="6">
				<v-row no-gutters class="justify-center text-overline font-weight-black">
					<p class="my-auto">I'm the footer</p>
					<v-spacer />
					<p class="my-auto">See how I was built</p>
					<v-btn
						icon
						variant="plain"
						href="https://dev.to/czerma/how-to-build-optimized-vuetify-3-nuxt-3-project-4l5k"
						target="_blanc"
						><v-icon icon="$info" color="green-accent-4" />
					</v-btn>
				</v-row>
			</v-footer>
		</v-app>
	</div>
</template>

<script setup>
	const showDrawer = ref(false);

	const toggle = () => {
		console.log('toggle()');
		showDrawer.value = !showDrawer.value;
	};

	/* Redundant unused code to test treeshaking */
	const unusedFunction = () => console.log('unusedFunction()');
</script>

<style>
	/* Redundant unused code to test treeshaking */
	.unused-selector-app {
		color: orange;
	}
</style>
