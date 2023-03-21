<script setup>
	/*
		Use
	*/
	const { getNavigationGroup } = useNavigationItems();
	const { visualizeLayout } = useVisualize();
	const { log } = useLogs('theHeader');

	log.info(() => console.log("✅ Initializing TheHeader"));

	/*
		Drawer
	*/
	const showDrawer = ref(false);
	const toggleDrawer = () => (showDrawer.value = !showDrawer.value);

	const navItems = getNavigationGroup("top-nav");
</script>

<template>
	<the-drawer v-model="showDrawer" @close="toggleDrawer" />

	<!-- HEADER -->
	<v-app-bar class="ma-0 py-0 px-4" :style="visualizeLayout">
		<v-app-bar-title>I'm the Header.</v-app-bar-title>

		<!-- Top navigation items -->
		<div class="d-none d-sm-block">
			<v-btn
				v-for="item in navItems"
				:key="item.text"
				:to="item.path"
				:append-icon="item.icon"
			>
				{{ item.text }}
			</v-btn>
		</div>

		<!-- Hamburger toggler -->
		<v-app-bar-nav-icon @click="toggleDrawer" icon="$menu" class="d-sm-none" />
	</v-app-bar>
</template>
