import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { City } from "../../models/city";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CityService {

    constructor(public http: HttpClient) {
    }

	/** */
    findAll(estado_id : string) : Observable<City[]>  {
        return this.http.get<City[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }
}