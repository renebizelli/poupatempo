import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {
    set (key: string, value: any)       {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get(key: string) {
        return localStorage.getItem(key);
    }

    has(key: string) {
        return localStorage.getItem(key) != null;
    }
}