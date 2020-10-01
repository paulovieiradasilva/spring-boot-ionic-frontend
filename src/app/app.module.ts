import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/** */
import { MyApp } from './app.component';

/** */
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';

/** */
import { CategoriaService } from './../services/domain/categoria.services';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoriaService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ErrorInterceptorProvider
  ]
})
export class AppModule { }
