import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_CONFIG } from '../../config/api.config';
import { Order } from '../../models/order';

@Injectable()
export class OrderService {

	constructor(public http: HttpClient) { }

	/** */
	insert(obj: Order) {
		return this.http.post(`${API_CONFIG.baseUrl}/pedidos`, obj, { observe: 'response', responseType: 'text' });
	}

}