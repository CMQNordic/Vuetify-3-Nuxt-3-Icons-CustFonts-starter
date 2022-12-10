
## Nuxt 3 & Vuetify 3 starter to be used as a reference.

## Demonstrates: 
- Adding of Vuetify 3 to a Nuxt 3 projects.
- Configuration for including svg  Fontawesome and Mdi icons.
- Changing vuetify scss styles and to transpile new styles (i.e.changing default font).
- Adding PostCss functionality like nesting and mixins.
- Adding some default stretched layout that is common to use.
- Adding Tailtwind for additional styling in parallel with Vuetify (test out at least)
  
 <br />
  

### ▶ [**Get started**](#)

**► Scaffolded Vuetify 3 & Vue 3 project** (as on Dec 2022)
```javascript
> npm create vuetify 
```

**► Add Vuetify 3 to existing Nuxt 3 project** (as on Dec 2022)
There are som starter templates to use or look at or as reference: [nuxt3-and-vuetify](https://github.com/CodyBontecou/nuxt3-and-vuetify) or [nuxt3-vuetify3-starter](https://github.com/BayBreezy/nuxt3-vuetify3-starter)

**1.** Create Nuxt 3 project if not already done
```javascript
> npx nuxi init nuxt-3-vuetify-3-starter

> cd nuxt-3-vuetify-3-starter

// Now we have a configurated Nuxt 3 project template 😀
// Replace <NuxtWelcome /> with <NuxtPage /> in `app.vue` and 
// add a route as pages/index.vue with a <v-btn> and styled <h1>
```

**2.** Add Vuetify 3 to your nuxt project
```javascript
> npm add vuetify@next (or npm add vuetify@^3.0.4)

// scraffold a plugins/vuetify.ts file where we'll configure vuetify
> npx nuxi add plugin vuetify

> npm install

// Now we heve Nuxt 3 project with Vuetify 3 ready to run 😀
```

**3.** Create & configure Vuetify 3

> Vuetify uses **SASS** to craft the styles and helpers. By default the installation comes with all precompiled css styles, but normally it is desited to manipulate produced styles to include own defined configuration. We can owerwrite some scss variables for that. Nuxt uses **Vite/Webpack** to transpile & Vite supports sass files out of the box but scss preprocessor (sass) itself must be installed for Vite.

> Treeshaking process do not remove css classes that are not used, only minimizes js bundles. We try out useing **nuxt-purgecss** module to remove unused CSS from build bundle.

> Vuetify components internally use some few icons like hamburger bar ($menu) for <app-bar-menu-icon>. Vuetify uses aliases for those icons and provides just those icons by default with theirr aliases. All the other icons you want to add you must installed first.

In order to auto inculde only used components (aka treeshaking) we must install required plugins:  
```
> npm i -D sass nuxt-purgecss vite-plugin-vuetify 
```
Now we **need to update** 2 files: `plugins/vuetify.ts` and `nuxt.config.js`

**Add** the following code in **`plugins/vuetify.ts`** 
```javascript
import { createVuetify } from 'vuetify';

// Add ALL prebuild styles (with Roboto as default font :/). 
// We configure those later with help of Vite & assets/css/vuetify/setting.scss. 
// Vite will load those setings before each of vuetify’s stylesheets.
// Described in https://next.vuetifyjs.com/en/features/sass-variables/#component-specific-variables
import 'vuetify/styles';

/* Import default SVG iconsets with corresponding aliases (including svg icons) */
/* Described in https://next.vuetifyjs.com/en/features/icon-fonts/ */
import { mdi, aliases } from 'vuetify/iconsets/mdi-svg';

export default defineNuxtPlugin((nuxtApp) => {
  
	const vuetify = createVuetify({
		ssr: false,
		icons: {
			defaultSet: 'mdi',
			aliases,
			sets: { mdi },
		},
	});

	nuxtApp.vueApp.use(vuetify);

	console.log('❤️ Initialized Vuetify 3');
});
```

Additionally **add** following in your **`nuxt.config.ts:`**
```javascript
import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
	/*  Shall server render pages (= universa app)? False means SPA. */
	ssr: false,

	css: [
		/*  Global css styles for this project, if any */
		// '@/assets/css/main.css'
	],

	modules: [
		/* Auto-include only used v-components & v-directives, aka "treeshaking" */
		/* As described in https://next.vuetifyjs.com/en/features/treeshaking/   */
		async (options, nuxt) => {
			nuxt.hooks.hook('vite:extendConfig', (config) => {
				config?.plugins?.push(
					vuetify(),
				);
			});
		},

		/* Clean css output from unused classes. Have not tried this out very well but seems to work */
		'nuxt-purgecss',
	]
  
});
```

### Done. Now... Run your project 😀
```javascript
> npm run dev
or
> npm run build
> npm run preview

// You can see that .output/public/_nuxt/xxx.css are smaller and do not include unused classes nor components 😀
```


###  ▶ **[Additional configuration of Vuetify](#)**
**► [Overwrite default styles (i.e. change default vuetify font)](#)**
In order to overwite vuetify sass setting nested deeply in node_modute/vuetify somwhere, just create an `assets/css/vuetify/settings.scss` file and update `nuxt.config.js` as below:
```javascript
...
  async (options, nuxt) => {
    nuxt.hooks.hook('vite:extendConfig', (config) => {
      config?.plugins?.push(
        vuetify(
          
          {
            /* Use customized scss rules defined in settings.scss */
            styles: { configFile: 'assets/css/vuetify/settings.scss' },
          }
        
        ),
      );
    });
  },
  ...
```

And in file `assets/css/vuetify/settings.scss` add

```javascript
/* Only put variables, mixins, and functions in this settings file. */ 
/* Styles should be placed in the main stylesheet or loaded another way. */
@use 'vuetify/settings' with (
	// add whatever you wish to modify. I.e.
	$font-size-root: 1.4rem,
	$body-font-family: sans-serif
);
```


**►[ Add icons](#)**
Internally, by default, Vuetify 3 supports several free icon-sets such as:
- [Material Design Icons](https://materialdesignicons.com/) 
- [Font Awsome 5](https://fontawesome.com/v5/search) 
  
> Note! it is **recommended** to use **mdi-svg** but internally without any configuration Vuetify 3 by default uses `mdi` icon set!? That is same as `import { mdi, aliases } from 'vuetify/iconsets/mdi'`.

First install icons and necessary helpers to be able pick desired icons only later on from those:
As described on Fontawesome site - [here](https://fontawesome.com/docs/web/use-with/vue/)
See free avaiable Fontawesome icons - [here](https://fontawesome.com/search?o=r&m=free&s=regular%2Csolid)
As descriped on Vuetify site - [here](https://next.vuetifyjs.com/en/features/icon-fonts/).

Install free fontawesome svg icons:
```javascript
// Install free fontawesome svg icons to choose from (solid, regular, brands)
npm i -D @fortawesome/free-solid-svg-icons 
npm i -D @fortawesome/free-brands-svg-icons
npm i -D @fortawesome/free-regular-svg-icons 

// Install SVG core engine for adding selected icons to a library
npm i -D @fortawesome/fontawesome-svg-core

// Install special helper component for Vue 3
npm i -D @fortawesome/vue-fontawesome@latest-3
```

Install free mdi svg icons:
```javascript
npm i -D @mdi/js
```

Changes neede to be done in `plugins/vuetify.ts`:
```javascript
TODO
```
### Done. Now.. Use desired icons in your components 😀
```html
<!-- Prefered way of defining a bouncing Font Awsome icon  -->
<v-icon 
  icon="fas:fas fa-info-circle" 
  size="x-small"
  color='blue' 
  class="fa-bounce"
/>

<v-btn 
  flat 
  icon="mdi:mdi-cursor-default-click" 
  size="large" 
  color="transparent"
/>
```

<p align=right><a id="vuetify-layouts" href="#vtoc">↩Back To Top</a></p>
