# keycloak-ionic
This is an extended version of the existing keycloak.js Adapter. It's the same code, I try to keep it up-to-date. The only difference are 2 more adapters for capacitor. I know it's possible to provide custom adapters, but writing it in the original library means to reuse the existing private methods to analyse keycloak responses, more efficiency and less code duplicates.

Original (**v11.0.2**) Implementation: 
* https://github.com/keycloak/keycloak/blob/11.0.2/adapters/oidc/js/src/main/resources/keycloak.js

Official Documentation:
* https://www.keycloak.org/docs/latest/securing_apps/index.html#javascript-adapter-reference
* https://www.keycloak.org/docs/latest/securing_apps/index.html#hybrid-apps-with-cordova

Extensions:
* Added `capacitor` adapter
* Added `capacitor-native` adapter

## Adapter: capacitor-native
Adapter to use the system browser.
### Prerequisites
* Setup your iOS App to work with universal links (see official docs linked above)
* Setup your Android App to work with deep links

The adapter will directly access Capacitors app api to listen to iOS (universal links) and Android deep links.
Also the native browser will be opened for the login/logout/register and account management pages.

### Usage
1. Install package
````
npm i keycloak-ionic
````
2. Use it
````Typescript
public keycloak: Keycloak.KeycloakInstance;

constructor() {

this.keycloak = Keycloak({
    clientId: 'webapp',
    realm: 'master',
    url: 'http://localhost:8080/auth/'
});
this.keycloak.init({
    adapter: 'capacitor-native',
    responseMode: 'query',
    redirectUri: 'http://localhost:8100'
});

// Test if it works, when coming back from this.keycloak.login();
this.keycloak.onAuthSuccess = () => {
    console.log('authenticated!');
};

}
````

## Adapter: capacitor
Adapter to use an inApp browser
### Prerequisites
* Install [cordova-plugin-browsertab](https://github.com/google/cordova-plugin-browsertab)
* Setup your iOS App to work with universal links (see official docs linked above)
* Setup your Android App to work with deep links

The adapter will directly access Capacitors app api to listen to iOS (universal links) and Android deep links.
Also the inApp browser will be opened for the login/logout/register and account management pages.

### Usage
1. Install package
````
npm i keycloak-ionic
````
2. Use it
````Typescript
public keycloak: Keycloak.KeycloakInstance;

constructor() {

this.keycloak = Keycloak({
    clientId: 'webapp',
    realm: 'master',
    url: 'http://localhost:8080/auth/'
});
this.keycloak.init({
    adapter: 'capacitor',
    responseMode: 'query',
    redirectUri: 'http://localhost:8100'
});

// Test if it works, when coming back from this.keycloak.login();
this.keycloak.onAuthSuccess = () => {
    console.log('authenticated!');
};

}
````
