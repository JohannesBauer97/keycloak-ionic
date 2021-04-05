import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as Keycloak from '../../../../../src';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public keycloak: Keycloak.KeycloakInstance;
  public authSuccess: boolean;
  public userProfile: Keycloak.KeycloakProfile;

  constructor(private changeRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
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
      console.log('login');
      this.authSuccess = true;
      this.changeRef.detectChanges();
    };

    this.keycloak.onAuthLogout = () => {
      console.log('logout');
      this.authSuccess = false;
      this.userProfile = null;
      this.changeRef.detectChanges();
    };
  }

  login(): void {
    this.keycloak.login();
  }

  loadProfile(): void {
    this.keycloak.loadUserProfile().then(profile => {
      this.userProfile = profile;
      this.changeRef.detectChanges();
    });
  }

  logout(): void {
    this.keycloak.logout();
  }

}
