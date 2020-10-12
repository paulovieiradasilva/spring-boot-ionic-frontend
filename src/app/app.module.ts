import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/** Components */
import { MyApp } from './app.component';

/** Intercerptors */
import { AuthInterceptorProvider } from './../interceptors/auth-interceptor copy';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';

/** Services */
import { CategoryService } from '../services/domain/category.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ClientService } from '../services/domain/client.service';
import { ProductService } from '../services/domain/product.service';


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
		CategoryService,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		AuthInterceptorProvider,
		ErrorInterceptorProvider,
		AuthService,
		StorageService,
		ClientService,
		ProductService
	]
})
export class AppModule { }
