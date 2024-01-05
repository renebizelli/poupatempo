import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class LoaderService {
    notify: Subject<boolean> = new Subject<boolean>();
    onNotify(value:boolean) {
        this.notify.next(value);
    }
}