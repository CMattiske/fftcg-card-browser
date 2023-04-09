import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// import { OKTA_CONFIG, OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FFTCGModule } from './fftcg/fftcg.module';


// const oktaConfig = {
//   issuer: 'https://dev-29755808.okta.com/oauth2/default',
//   clientId: '0oa7r1krl0JQ0qSTW5d7',
//   redirectUri: window.location.origin + '/callback',
// }

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // OktaAuthModule,

    MatButtonModule,
    MatIconModule,
    MatToolbarModule,

    FFTCGModule,
  ],
  providers: [
    // {
    //   provide: OKTA_CONFIG, useValue: oktaConfig
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
