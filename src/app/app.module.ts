import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientProvider } from './core/servicies/http-client.provider';
import { AuthService } from './core/servicies/auth.service';
import { JwtService } from './core/servicies/jwt.service';
import { ApiService } from './core/servicies/api.service';
import { HttpClientWebProvider } from './core/servicies/http-client-web.provider';
import { AuthStrapiService } from './core/servicies/auth-strapi.service';

export function httpProviderFactory(
  http:HttpClient) {
  return new HttpClientWebProvider(http);
}

export function AuthServiceProvider(
  jwt:JwtService,
  api:ApiService
) {
  return new AuthStrapiService(jwt, api);
}
@NgModule({
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [AppComponent],
  providers:[
    {provide:RouteReuseStrategy,useClass:IonicRouteStrategy},
    {
      provide: HttpClientProvider,
      deps:[HttpClient,Platform],
      useFactory:httpProviderFactory
    },
    {
      provide:AuthService,
      deps:[JwtService,ApiService],
      useFactory: AuthServiceProvider
    }
  ],
})
export class AppModule {}
