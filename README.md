# revuese
Starterkit/ Boilerplate for Projects with Vue, Vuex, Vuetify and Firebase Authentication + Firestore DB.

###### @author: uke5tar
###### @date: 2020-04-01
###### @demo: https://revuese.netlify.com
###### @login: revuese@ilearnjavascript.com (email) / revuese (password)

## About
Don't bother reinventing the wheel for each project. Use this vue-starter-kit/ vue-boilerplate with google firestore-authentication to jump into developing your idea straight away. Get authentication (firestore), dynamic routing, state management (vuex), the powerful vuetify component library, SCSS support, a modern testing Setup (Cypress & Jest), the latest bable plugins (optional chaining/ nullish-coalescing-operator) and much more ready configured for your next project.

## How to get started
1. git clone https://github.com/uke5tar/revuese.git
2. cd into revuese
3. Change all occurences of 'revuese' in the code with your projects'name
4. Run npm install
5. Create .env.local file in root directory 
6. Setup Firebase account: https://firebase.google.com/
7. Go to console (https://console.firebase.google.com/) and create new web project
8. Create a new web app for your project including firestore
9. Go within firebase console to the tab Authentication - Sign-in Method and enable Email/Password as sign-in method for your project
10. Go within firebase console to Database and create a new table named 'users' in your firestore database (you can use Auto ID) and change the database rule to
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
       allow read, write: if request.auth.uid != null;
    }
  }
}
```
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
16. Firebase provides free Hosting for your app. Go to the tab Hosting within the firebase console to see your project's subdomain url.


## Features
Special features:
- Dynamic routing
-- Each folder within src/pages will be automagically turned into a route (see src/plugins/router/helper.js) 
- Dynamic store
-- The store comes with two pre-build Modules. 'User' and Current'. The latter one is special because state, getters, actions and mutations are automagically created by simply adding the name for it into a predefined array thus avoiding to write unnecessary boilerplate code. It works only for simple state values that don't specific specific calculations (see src/plugins/store/helper/storeCreator.js) 
- Firebase Authentication
-- Firebase Authentication (.env.local with api credentials needed) with individual methods on prototype ($firebase, $fireauth and $firestore)
-- Comes with login, logout, signup and password-reset pages and the built-in logic needed for that to authenticate.
- Automatic creation of an user database in firestore after signup
- Firebase CRUD methods
-- Essential Firebase methods are abstracted into reusable mixins (addNamedCollection, addAutoIdCollection, getData, mergeData, removeField, updateData, overwriteData) with userUid by default

Other features:
- Vuetify component library with robo-font and material design icon library locally installed via npm 
- Opiniated eslint configuration with airbnb config (without prettier)
- ForceRerender mixin that updates the clean way in Vue via updating a key of the desired component
- Page transitions via docs: https://www.npmjs.com/package/vue-page-transition
- Vue fragments via docs: https://www.npmjs.com/package/vue-fragment
- i18n multi-language support

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


## Commands
See: 'How to get started' for detailed project setup instructions.

### Project setup
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
