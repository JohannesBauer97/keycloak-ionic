import {Component} from '@angular/core';
import * as Keycloak from "../../../../../src";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public keycloak: Keycloak.KeycloakInstance;
  public authSuccess: boolean = false;
  public userProfile: Keycloak.KeycloakProfile;

  constructor() {
    this.keycloak = Keycloak({
      clientId: 'webapp',
      realm: 'master',
      url: 'http://localhost:8080/auth/'
    });

    this.keycloak.init({
      adapter: 'capacitor-native',
      responseMode: 'query',
      redirectUri: 'ng-example://home'
    });

    this.keycloak.onAuthSuccess = () => {
      console.log('authenticated!');
      this.authSuccess = this.keycloak.authenticated;
      this.keycloak.loadUserProfile().then(profile => this.userProfile = profile);
    };

  }

  login(): void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout();
  }

}
