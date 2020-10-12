import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { API_CONFIG } from '../config/api.config';
import { Credential } from '../models/credential';
import { LocalUser } from '../models/local-user';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

	jwtHelper: JwtHelper = new JwtHelper();

	constructor(public http: HttpClient, public storageService: StorageService) { }

	/** */
	authenticate(creds: Credential) {
		return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, { observe: 'response', responseType: 'text' });
	}

	/** */
	successfulLogin(autorization: string) {
		let token = autorization.substring(7);
		let user: LocalUser = {
			token,
			email: this.jwtHelper.decodeToken(token).sub
		};
		this.storageService.setLocalUser(user);
	}

	/** */
	refreshToken() {
		return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, {}, { observe: 'response', responseType: 'text' });
	}

	/** */
	logout() {
		this.storageService.setLocalUser(null);
	}

}
