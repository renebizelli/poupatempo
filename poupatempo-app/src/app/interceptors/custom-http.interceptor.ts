import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { LoaderService } from "../services/loader.service";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

    constructor(private loaderService: LoaderService,
        private authService:AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.onNotify(true);

        if(this.authService.authenticated()) {
            req = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${this.authService.GetToken()}`)
              });
        }
 
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