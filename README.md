# revuese
Starterkit for Projects with Vue, Vuex, Vuetify and Firebase Authentication + Firestore DB.

###### @author: uke5tar
###### @date: 2020-04-01
###### @demo: https://revuese.netlify.com
###### @login: revuese@ilearnjavascript.com (email) / revuese (password)

## About
Don't bother reinventing the wheel for each project. Use this starter kit to jump into developing your idea straight away without setting up authentication, routing, vuex, firestore and much more yourself. Find out what features await you:

Special features:
- Dynamic routing
-- Each folder within src/pages will be automagically turned into a route (see src/plugins/router/helper.js) 
- Dynamic store
-- The store comes with two pre-build Modules. 'User' and Current'. The latter one is special because state, getters, actions and mutations are automagically created by simply adding the name for it into a predefined array thus avoiding to write unnecessary boilerplate code. It works only for simple state values that don't specific specific calculations (see src/plugins/store/helper/storeCreator.js) 
- Firebase Authentication
-- Firebase Authentication (.env.local with api credentials needed) with individual methods on prototype ($firebase, $fireauth and $firestore)
-- Comes with login, logout, signup and password-reset pages and the built-in logic needed for that to authenticate.
- Automatic creation of an user database in firestore after signup

Other features:
- Vuetify component library with robo-font and material design icon library locally installed via npm 
- Opiniated eslint configuration with airbnb config (without prettier)
- ForceRerender mixin that updates the clean way in Vue via updating a key of the desired component
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
- SCSS support pre-configured via sass-ressource-loader in vue.config.js

Config:
- Dedicated config files in root

Babel:
- Optional-chaining
- Nullish-coalescing-operator

Packages/ Tools:
- Vuex
- Vuex persistant state (persist after reload)
- Vuetify
- Secure-ls to encrypt local vuex state
- Webpack
- Babel
- Jest (unit)
- Cypress (E2E)
- Husky (Git hooks)

## How to get stareted
1. git clone https://github.com/uke5tar/revuese.git
2. cd into revuese
3. Change all occurences of 'revuese' in the code with your projects'name
4. Run npm install
5. Create .evn.local file in root directory 
6. Setup Firebase account: https://firebase.google.com/
7. Go to console and create new web project
8. Create a new web app for your project including firestore
9. Setup Email/Password sign-in method for your project
10. Create a new table named 'users' in your firestore database
11. Copy ApiKey, AuthDomain and ProjectId into .env.local file with the following syntax:
```
VUE_APP_FIREBASE_API_KEY=%%API_KEY%%
VUE_APP_FIREBASE_AUTH_DOMAIN=%%AUTH_DOMAIN%%
VUE_APP_FIREBASE_PROJECT_ID=%%PROJECT_ID%%
```
12. Run npm start
13. Go to localhost:8080
14. Click on Signup here and register
15. A new users database has been created for you (check in Firebase Admin Panel in the section 'Databases')


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
