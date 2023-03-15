<script setup>
	/*
		Use
	*/
	const { getNavigationGroup } = useNavigationItems();
	const { layoutsOn } = useVisualize();
	const { log } = useLogs();

	log.info(() => console.log("✅ Initializing TheHeader"));

	/*
		Drawer
	*/
	const showDrawer = ref(false);
	const toggleDrawer = () => (showDrawer.value = !showDrawer.value);

	/*
		More
	*/
	const showMore = ref(false);
	const toggleMore = () => (showMore.value = !showMore.value);

	const navItems = getNavigationGroup("top-nav");

	/*
		Event handlers
	*/
	const handleNavItemClick = (navItemId = "") => {
		if (navItemId == "blog") toggleMore();
	};
</script>

<template>
	<!-- Main side navigation -->
	<the-drawer v-model="showDrawer" @close="toggleDrawer" />

	<!-- Header -->
	<v-app-bar class="ma-0 py-0 px-4" :class="{ visualizeLayouts: layoutsOn }">
		<v-app-bar-title>I'm the Header.</v-app-bar-title>

		<!-- Top navigation items -->
		<div class="d-none d-sm-block">
			<v-btn
				v-for="item in navItems"
				:key="item.text"
				:to="item.path"
				:append-icon="item.icon"
				@click="handleNavItemClick(item.text)"
			>
				{{ item.text }}
			</v-btn>
		</div>

		<!-- Hamburger toggler -->
		<v-app-bar-nav-icon @click="toggleDrawer" icon="$menu" class="d-sm-none" />
	</v-app-bar>

	<more-navigation v-model="showMore" @click="toggleMore" />
</template>
