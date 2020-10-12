import { StorageService } from './../services/storage.service';
import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(public storageService: StorageService) {}

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
					case 403:
						this.handler403();
						break;
				}

				return Observable.throw(errorObj);
			}) as any;
	}

	/** */
	handler403() {
		/** */
		this.storageService.setLocalUser(null);
	}
}

/** */
export const ErrorInterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: ErrorInterceptor,
	multi: true,
};