import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { LoaderService } from "../services/loader.service";
import { Injectable } from "@angular/core";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

    constructor(private loaderService: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.onNotify(true);
        return next.handle(req)
        .pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.loaderService.onNotify(false);
                }
                return event;
            }))
    };

}