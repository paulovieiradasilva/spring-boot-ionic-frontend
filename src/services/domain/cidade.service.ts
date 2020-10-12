import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Cidade } from "../../models/cidade";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CidadeService {

    constructor(public http: HttpClient) {
    }

	/** */
    findAll(estado_id : string) : Observable<Cidade[]>  {
        return this.http.get<Cidade[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }
}