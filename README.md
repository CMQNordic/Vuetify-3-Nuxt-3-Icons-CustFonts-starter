# Minimal template for Vuetify3 / Nuxt3 project

This is a fully documented minimal project template providing:

- **Vuetify**
Configuration of Vuetify 3 with treeshaking through a plugin started at start up. 
- **Routes/pages**
Two routes pages for demo
- **Icons**
Minimalistic usage of default (vuetify build-in) svg icons as globally accessible aliases.
- **Log configuration through simple admin panel**
Simple logging configuration that can be enabled/disable through simple admin panel.
- **Environment variables**
Some dummy keys and build optins as environment variables
- **CSS treeshaking**
Removal of unused css code from production bundle using [nuxt-purgecss](https://www.npmjs.com/package/nuxt-purgecss).
- **Deployment**
Build as statically generated site deployed on to Netlify.

👀 Read my article [here](https://dev.to/czerma/how-to-build-optimized-vuetify-3-nuxt-3-project-4l5k) for details on how it was created and in general how to configure and minify an **Vuetify project**.

🌎 Live demo [here](https://magical-peony-07c1dc.netlify.app/)

<br>

**When building for production!**
1. For purgecss to work. First build static site: 
```
ssr: true +  npm run generate
```
2. Copy created folder `dist` to `modules/purgecss/static-generated-htm/`.
3. Build the project for production again.

> By doing this "2-step-build" we first generate static site with all used selector and use this code as "template" for purgecss to know which selectors are used and which are unused ond ok to remove.

<br>
Happy coding ✌️