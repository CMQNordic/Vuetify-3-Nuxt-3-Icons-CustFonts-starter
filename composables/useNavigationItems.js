import { navigationItems } from "@/app-settings/navigation-items.js";

const { log } = useLogs();

/**.
 * Returns navigation item identified by provided id
 *
 * @param {string} id - Unique identification (matches toward: "lKey" or first found "text").
 * @return {import('~~/app-settings/navigation-items.js').NavigationItem | {} } - See {@link NavigationItem}
 */
function getNavigationItem(id) {
	// @ts-ignore
	let retVal = navigationItems.find((item) => item[1].lKey == id)?.[1];
	// @ts-ignore
	if (!retVal) retVal = navigationItems.find((item) => item[1].text == id)?.[1];

	log.debug(() => console.log(`👀 getNavigationItem(${id}) =>`, retVal));

	return retVal || {};
}

/**
 * Returns array with items belonging to provided group id.
 *
 * @param {string} group - Group contaning sub items.
 * @param {string} [excludeLKey] - lKey id that shall be excluded from returned items.
 * @return { [] | Array<import('~~/app-settings/navigation-items.js').NavigationItem>} - See {@link NavigationItem}
 */
function getNavigationGroup(group, excludeLKey = "") {
	const retVal = navigationItems
		.filter((item) =>
			// @ts-ignore
			item[0] == group ? (item[1].lKey != excludeLKey ? true : false) : false,
		)
		.map((item) => item[1]);

	log.debug(() => console.log(`👀 getNavigationGroup(${group}) =>`, retVal));

	// @ts-ignore
	return retVal || [];
}

/** This composable provides functionality for navigation items
 * @module useNavigationItems
 * @returns getNavigationItem - fff
 * */
export function useNavigationItems() {
	return {
		getNavigationItem,
		getNavigationGroup,
	};
}
