import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Produto } from '../../models/produto';

@Injectable()
export class ProdutoService {

	constructor(public http: HttpClient) { }

	/** */
	findById(id: string) {
		return this.http.get<Produto>(`${API_CONFIG.baseUrl}/produtos/${id}`);
	}

	/** */
	findByCategoria(categoria_id: string, page: number = 0, linesPerPage: number = 24) {
		return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
	}

}
