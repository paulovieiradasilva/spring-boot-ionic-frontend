import { StorageService } from '../storage.service';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../../models/client';
import { API_CONFIG } from '../../config/api.config';

@Injectable()
export class ClientService {

	constructor(public http: HttpClient, public storage: StorageService) { }

	/** */
	findByEmail(email: string): Observable<Client> {
		return this.http.get<Client>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
	}

	/** */
	getImageFromBucket(id: string): Observable<any> {
		return this.http.get(`${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`, { responseType: 'blob' });
	}

	/** */
	insert(obj: Client) {
		return this.http.post(`${API_CONFIG.baseUrl}/clientes`, obj, { observe: 'response', responseType: 'text' });
	}

}
