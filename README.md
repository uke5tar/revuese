# revuese
Boilerplate for projects using vue, vuex and firebase. This project was created via Vue CLI including PWA setup.

Special features:
- Each folder within pages will be automagically turned into a route (see src/plugins/router/helper.js) 
- 'Current' Module in vuex creates state, getters, actions and mutations automagically. Use it only for simple state functions that don't need calculations but simply store and retrieve data (see src/plugins/store/helper/storeCreator.js) 
- Firebase integration (create .env.local with your api credentials) with individual methods on prototype for $firebase, $fireauth, $firestore
- Login, logout, signup and password-reset methods abstracted into mixins for firebase
- vuefire and vuexfire setup for keeping data in sync
- forceRerender mixin that updates the clean way in vue via updating a key

Other features:
- Vuetify component library with robo-font and material design icon library locally installed via npm 
- Opiniated eslint configuration with airbnb config (without prettier)
- Automatic creation of an user database in firestore after signup
- Page transitions via docs: https://www.npmjs.com/package/vue-page-transition
- Vue fragments via docs: https://www.npmjs.com/package/vue-fragment

Components (prebuilt):
- Login, Signup, Passwordreset (before auth)
- Appbar, Navigation Drawer (after auth)
- Profile with necessary logic to update own profile in firebase
- Draggable Modal with many functionalities
- Loader and snackbar with dedicated methods and default values (see mixins/snackbar and mixins/loader)
- Title as an example global component (see components/global) with an example unit test

Pages (prebuilt):
- Login, Signup, Passwordreset, Home, Account, Settings, Error

SCSS:
- SCSS support preconfigured via sass-ressource-loader in vue.config.js

Config:
- Dedicated config files in root

Babel:
- Optional-chaining
- Nullish-coalescing-operator

Packages/ Tools:
- Vuex
- Vuex persistant state (persist after reload)
- Secure-ls to encrypt local vuex state
- Webpack
- Babel
- Jest (unit)
- Cypress (E2E)
- Husky (Git hooks)


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve || npm run start
```

### Compiles and minifies for production
```
npm run build
```

### Run unit and end-t-end tests
```
npm run test
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
