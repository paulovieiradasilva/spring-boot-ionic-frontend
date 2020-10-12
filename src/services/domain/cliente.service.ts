import { StorageService } from './../storage.service';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { API_CONFIG } from '../../config/api.config';

@Injectable()
export class ClienteService {

	constructor(public http: HttpClient, public storage: StorageService) { }

	/** */
	findByEmail(email: string): Observable<Cliente> {
		let token = this.storage.getLocalUser().token;
		let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

		return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`, { headers });
	}

	/** */
	getImageFromBucket(id: string): Observable<any> {
		return this.http.get(`${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`, { responseType: 'blob' });
	}

}
