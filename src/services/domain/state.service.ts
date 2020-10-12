import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { State } from "../../models/state";
import { Observable } from "rxjs/Rx";

@Injectable()
export class StateService {

    constructor(public http: HttpClient) {
    }

	/** */
    findAll() : Observable<State[]>  {
        return this.http.get<State[]>(`${API_CONFIG.baseUrl}/estados`);
    }
}