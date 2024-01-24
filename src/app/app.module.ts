import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './core/servicies/auth.service';
import { JwtService } from './core/servicies/jwt.service';
import { ApiService } from './core/servicies/api.service';
import { AuthStrapiService } from './core/servicies/auth-strapi.service';
import { HttpClientWebProvider } from './core/servicies/http-client-web.provider';
import { HttpClientProvider } from './core/servicies/http-client.provider';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

function AuthServiceFactory(jwtSvc: JwtService, apiSvc: ApiService) {
  return new AuthStrapiService(jwtSvc, apiSvc);
}
function HttpClientWebFactory(http: HttpClient) {
  return new HttpClientWebProvider(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,SharedModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: AuthService,
      deps: [JwtService, ApiService],
      useFactory: AuthServiceFactory,
    },
    {
      provide: HttpClientProvider,
      deps: [HttpClient],
      useFactory: HttpClientWebFactory,
    },
    {
      provide: 'login',
      useValue:'/login'
    },
    {
      provide: 'afterLogin',
      useValue:'/home'
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
