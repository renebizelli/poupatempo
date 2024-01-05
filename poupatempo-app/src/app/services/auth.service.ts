import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class AuthService {

    private base_url = 'http://localhost:5001/poupatempo-rene/us-central1/app/api/v1/public';

    constructor(
        private http: HttpClient,
        private localStorage: LocalStorageService) {

    }

    login (identifier: string, password: string) : Observable<object>     {
        return this.http.post(`${this.base_url}/login`, { identifier, password })
    }

    authenticated() {
        return this.localStorage.has("ACCESS_TOKEN");
    }
}