import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Product } from '../../models/product';

@Injectable()
export class ProductService {

	constructor(public http: HttpClient) { }

	/** */
	findById(id: string) {
		return this.http.get<Product>(`${API_CONFIG.baseUrl}/produtos/${id}`)
			.map((x: any) => {
				return { id: x.id, name: x.nome, price: x.preco };
			});
	}

	/** */
	findByCategoria(categoria_id: string, page: number = 0, linesPerPage: number = 24) {
		return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
	}

	/** */
	getSmallImageFromBucket(id: string): Observable<any> {
		return this.http.get(`${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`, { responseType: 'blob' });
	}

	/** */
	getImageFromBucket(id: string): Observable<any> {
		return this.http.get(`${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`, { responseType: 'blob' });
	}

}
