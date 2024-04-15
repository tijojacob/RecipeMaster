import { HttpHandler, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AUthService } from "./auth.service";
import { exhaustMap, take } from "rxjs";

@Injectable()

export class AuthInterceptorService {
    constructor(private authService : AUthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(!this.authService.user.value)
     {
        return next.handle(req);
     }
     return this.authService.user.pipe(take(1),exhaustMap((user)=>{
        const modifiedReq = req.clone({
            params : new HttpParams().set('auth',user.token)
        })
        return next.handle(modifiedReq);
     }));
    }
}