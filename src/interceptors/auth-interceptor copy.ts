import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage.service';

import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(public storageService: StorageService) { }

	/** */
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		let localUser = this.storageService.getLocalUser();

		let N = API_CONFIG.baseUrl.length;
		let reqToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;

		/** */
		if (localUser && reqToAPI) {
			const newReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localUser.token) });
			return next.handle(newReq);

		} else {
			return next.handle(req);
		}
	}

}

/** */
export const AuthInterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: AuthInterceptor,
	multi: true,
};