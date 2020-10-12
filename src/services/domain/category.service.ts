import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Category } from '../../models/category';
import { API_CONFIG } from '../../config/api.config';

@Injectable()
export class CategoryService {

	constructor(public http: HttpClient) {	}

	/** */
	findAll(): Observable<Category[]> {
		return this.http.get<Category[]>(`${API_CONFIG.baseUrl}/categorias`);
	}

}