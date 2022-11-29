import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Platform } from '@ionic/angular';

import Keycloak from '../../../../../src';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public keycloak: Keycloak.KeycloakInstance;
  public authSuccess: boolean;
  public userProfile: Keycloak.KeycloakProfile;
  public platformName: string = "";

  constructor(private changeRef: ChangeDetectorRef,
    public platform: Platform) {

  }

  ngOnInit(): void {
    this.keycloak = new Keycloak({
      clientId: 'webapp',
      realm: 'master',
      url: 'http://localhost:8080/' // warningn new version remove /auth
    });

    this.platform.ready().then((source) => {
      console.log("platform source " + source);

      if (this.platform.is('android')) {
        this.platformName = "running on Android device!";
      }
      if (this.platform.is('ios')) {
        this.platformName = "running on iOS device!";
      }
      else {
        this.platformName = "running in a browser.";
      }
      console.log("platform type: " + this.platformName);
    });

    if (this.platform.is("hybrid")) {
      this.keycloak.init({
        adapter: 'capacitor-native',
        responseMode: 'query',
        redirectUri: 'ng-example://home'
      });
    } else { // for web
        this.keycloak.init({
          adapter: 'default',
          redirectUri: 'http://localhost:8100/'
        });
    }


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
