/** Definition of all navigation items used in UI in this project
 *  @typedef {Array<string | NavigationItem>} GrouppedNavigationItem
 *  @type {Array<GrouppedNavigationItem>}
 */
export const navigationItems = [
	["top-nav", { text: "home", path: "/" }],
	["top-nav", { text: "about", path: "/about" }],
	["top-nav", { text: "settings", path: "/settings" }],
	["top-nav", { text: "blog", icon: "$menu" }],

	["blog", { text: "article 1", path: "/blog-1" }],
	["blog", { text: "article 2", path: "/blog-2" }],
];

/** Type definition: NavigationItem
 *  Object contaning all information about one navigation item.
 *
 *  @typedef {Object} NavigationItem
 *  @property {string} [lKey] - Language Key to fetch translated UI label (primary id).
 *  @property {string} [text] - Static UI label (secondary id).
 *  @property {string} [path] - Route path to navigate to when selected.
 *  @property {string} [sub] -  Group of subitems.
 *  @property {string} [icon] - Alias to appended icon.
 */
