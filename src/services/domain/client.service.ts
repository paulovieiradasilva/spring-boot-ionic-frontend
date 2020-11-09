import { StorageService } from '../storage.service';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../../models/client';
import { API_CONFIG } from '../../config/api.config';
import { ImageUtilService } from '../ImageUtilService';

@Injectable()
export class ClientService {

	constructor(
		public http: HttpClient,
		public storage: StorageService,
		public imageUtilSerice: ImageUtilService) { }

	/** */
	findByEmail(email: string): Observable<any> {
		return this.http.get<any>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
	}

	/** */
	findById(id: string): Observable<any> {
		return this.http.get<any>(`${API_CONFIG.baseUrl}/clientes/${id}`);
	}

	/** */
	getImageFromBucket(id: string): Observable<any> {
		return this.http.get(`${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`, { responseType: 'blob' });
	}

	/** */
	insert(obj: Client) {
		return this.http.post(`${API_CONFIG.baseUrl}/clientes`, obj, { observe: 'response', responseType: 'text' });
	}

	/** */
	uploadPicture(picture) {
		let blob = this.imageUtilSerice.dataUriToBlob(picture);
		let formDate: FormData = new FormData();

		formDate.set('file', blob, 'file.png');

		return this.http.post(`${API_CONFIG.baseUrl}/clientes/picture`, formDate, { observe: 'response', responseType: 'text' });
	}

}
