import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take, tap } from "rxjs";
import { AUthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService : AUthService, private router : Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(take(1),map((dta)=>{
            const isAuth= !!dta;
            if(isAuth)
            {
                return true;
            }
            else{
                return this.router.createUrlTree(['/auth']);
            }
        })
        // ,tap(isAuth=>{
        //     console.log(isAuth);
        //     if(!isAuth)
        //     {
        //         this.router.navigate(['/auth']);
        //     }
        // })
        )
    }
}