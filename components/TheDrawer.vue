<script setup>
	const emit = defineEmits(["close"]);
	const handleClick = () => emit("close");
</script>

<template>
	<!-- DRAWER -->
	<v-navigation-drawer temporary location="right">
		<div class="w-100 text-right">
			<v-btn flat icon="$close" size="x-large" @click.stop="handleClick" />
		</div>
		<v-app-bar-title>I'm the Drawer</v-app-bar-title>
	</v-navigation-drawer>
</template>
