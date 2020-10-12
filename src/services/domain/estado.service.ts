import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Estado } from "../../models/estado";
import { Observable } from "rxjs/Rx";

@Injectable()
export class EstadoService {

    constructor(public http: HttpClient) {
    }

	/** */
    findAll() : Observable<Estado[]>  {
        return this.http.get<Estado[]>(`${API_CONFIG.baseUrl}/estados`);
    }
}