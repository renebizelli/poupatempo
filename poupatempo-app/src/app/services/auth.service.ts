import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocalStorageService } from "./local-storage.service";
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

    private access_token_key = 'ACCESS_TOKEN';

    constructor(
        private http: HttpClient,
        private localStorage: LocalStorageService) {

    }

    login (identifier: string, password: string) : Observable<object>     {
        return this.http.post(`${environment.apiPublicUrl}/login`, { identifier, password })
    }

    authenticated() : boolean {
        return this.localStorage.has(this.access_token_key);
    }

    GetToken() : string {
        return this.localStorage.get(this.access_token_key) || '';
    }


}