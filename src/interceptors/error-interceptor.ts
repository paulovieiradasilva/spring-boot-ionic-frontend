import { StorageService } from './../services/storage.service';
import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(public storageService: StorageService, public alertCtrl: AlertController) { }

	/** */
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req)
			.catch((error, caught) => {
				let errorObj = error;

				if (errorObj.error) {
					errorObj = errorObj.error;
				}

				if (!errorObj.status) {
					errorObj = JSON.parse(errorObj);
				}

				/** */
				switch (errorObj.status) {
					case 401:
						this.handler401();
						break;
					case 403:
						this.handler403();
						break;
						
					default:
						this.handlerDefalutError(errorObj);
				}

				return Observable.throw(errorObj);
			}) as any;
	}

	/** */
	handler403() {
		/** */
		this.storageService.setLocalUser(null);
	}

	/** */
	handler401() {
		let alert = this.alertCtrl.create({
			title: 'Erro 401: falha de authenticação',
			message: 'Credencias incorretas',
			enableBackdropDismiss: false,
			buttons: [
				{ text: 'Ok' }
			]
		});
		alert.present();
	}

	/** */
	handlerDefalutError(err) {
		let alert = this.alertCtrl.create({
			title: 'Erro ' + err.status + ' : ' + err.error,
			message: err.message,
			enableBackdropDismiss: false,
			buttons: [
				{ text: 'Ok' }
			]
		});
		alert.present();
	}
}

/** */
export const ErrorInterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: ErrorInterceptor,
	multi: true,
};