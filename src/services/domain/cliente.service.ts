import { StorageService } from './../storage.service';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { API_CONFIG } from '../../config/api.config';

@Injectable()
export class ClienteService {

	constructor(public http: HttpClient, public storage: StorageService) { }

	/** */
	findByEmail(email: string): Observable<Cliente> {
		return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
	}

	/** */
	getImageFromBucket(id: string): Observable<any> {
		return this.http.get(`${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`, { responseType: 'blob' });
	}

}
