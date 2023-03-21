<script setup>
	const { visualizeLayout } = useVisualize();
</script>

<template>
	<!-- MAIN -->
	<v-main class="mx-2" :style="visualizeLayout">
		<v-container :style="visualizeLayout">
			<slot />
		</v-container>
	</v-main>
</template>
