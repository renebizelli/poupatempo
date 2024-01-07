import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { bill } from "../models/models";

@Injectable()
export class NubankService {

    constructor(
        private http: HttpClient) {
    }

    bills () : Observable<bill[]>     {
        return this.http.get<bill[]>(`${environment.apiPrivateUrl}/bills`)
    }

}