import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Categoria } from '../../models/categoria';
import { API_CONFIG } from './../../config/api.config';

@Injectable()
export class CategoriaService {

	constructor(public http: HttpClient) {	}

	/** */
	findAll(): Observable<Categoria[]> {
		return this.http.get<Categoria[]>(`${API_CONFIG.baseUrl}/categorias`);
	}

}