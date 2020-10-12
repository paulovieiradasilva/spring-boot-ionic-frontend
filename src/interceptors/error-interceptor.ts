import { StorageService } from './../services/storage.service';
import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { AlertController } from 'ionic-angular';
import { FieldMessage } from '../models/field-message';

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
					case 422:
						this.handler422(errorObj);
						break;
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
	handler422(e) {
		let alert = this.alertCtrl.create({
			title: 'Erro 422: Validação',
			message: this.listErros(e.erros),
			enableBackdropDismiss: false,
			buttons: [
				{ text: 'Ok' }
			]
		});
		alert.present();
	}

	/** */
	listErros(messages: FieldMessage[]): string {
		let s: string = '';

		for (var i = 0; i < messages.length; i++) {
			s += '<p><strong>' + messages[i].fieldName + '</strong>: ' + messages[i].message + '</p>';
		}
		return s;
	}

	/** */
	handlerDefalutError(e) {
		let alert = this.alertCtrl.create({
			title: 'Erro ' + e.status + ' : ' + e.error,
			message: e.message,
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