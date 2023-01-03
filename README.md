# Minimal Optimized Starter for Vuetify 3 with Nuxt 3

In this project starter:

> Adding Vuetify 3 with treeshaking to scaffolded Nuxt 3 project. 
> Importing only used default svg icon aliases
> Removeing unused css with nuxt-purgecss.

Read in detail article about how it was created [here](https://dev.to/czerma/how-to-build-optimized-vuetify-3-nuxt-3-project-4l5k)

Live demo [here](https://magical-peony-07c1dc.netlify.app/)

➡️**Build for production**:
- For purgecss first build static site: `ssr: true` + `npm run generate`
- Copy created folder `dist` to `modules/purgecss/static-generated-htm/`.
- Build the project for production.

> By doing this we generate selector templates for purgecss to know what to remove and what not.

Happy coding ✌️