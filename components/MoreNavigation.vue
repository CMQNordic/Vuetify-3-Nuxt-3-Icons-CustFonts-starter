<script setup>
	const { getNavigationGroup } = useNavigationItems();
	const navItems = getNavigationGroup("blog");
</script>

<template>
	<!-- DRAWER -->
	<v-navigation-drawer temporary location="right">
		<v-app-bar-title>I'm the Drawer</v-app-bar-title>

		<div v-for="item in navItems" :key="item.text">
			<v-btn :to="item.path">
				{{ item.text }}
			</v-btn>
		</div>
	</v-navigation-drawer>
</template>
