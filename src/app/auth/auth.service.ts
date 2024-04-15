import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AUthResponseData{
    idToken	: string,
    email	: string,
    refreshToken : string,
    expiresIn : string, // receiving in seconds
    localId : string,
    registered? : boolean
}

@Injectable()
export class AUthService{

    // user = new Subject<User>();
    user = new BehaviorSubject<User>(null);
    expirationTimer : any;

    constructor(private http : HttpClient, private router : Router){}
    signup(eml: string, pwd : string)
    {
        return this.http.post<AUthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={APIKey}',
        {
            email : eml,
            password : pwd,
            returnSecureToken : true
        }).pipe(catchError(this.handleError))
        
    }

    signIn(eml : string,  pwd : string)
    {
        return this.http.post<AUthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={APIKey}',
        {
            email : eml,
            password : pwd,
            returnSecureToken : true
        }).pipe(catchError(this.handleError), 
            tap((resData)=>{
                this.handleAuthentication(resData.email,resData.localId, resData.idToken, +resData.expiresIn,)
            }))
            
        
    }

    logOut()
    {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.expirationTimer)
        {
            clearTimeout(this.expirationTimer);
        }
        this.expirationTimer=null;
    }

    autoLogin()
    {
        const userData :{
            email : string, 
            id : string, 
            _token : string, 
            _tokenExpirationDate : string            
        }
        = JSON.parse(localStorage.getItem('userData'));
        if(!userData)
        {
            return;
        }
        else
        {
            const loadedUser = new User(userData.email,
                                userData.id,
                                userData._token,
                                new Date(userData._tokenExpirationDate))

            if(loadedUser.token)
            {
                this.user.next(loadedUser);
                const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.autoLogOut(expDuration);
            }
        }
    }

    autoLogOut( expirationNumber : number)
    {
        this.expirationTimer = setTimeout(()=>{
            this.logOut()
        },expirationNumber);
    }

    private handleAuthentication(email: string, userId : string, token : string, expiresIn : number)
    {
        const expirationDate = new Date(new Date().getTime() + +expiresIn*1000); // calculating everything in seconds
            const user = new User(
                email,
                userId,
                token,
                expirationDate
            )
            this.user.next(user);
            this.autoLogOut(expiresIn*1000);
            localStorage.setItem('userData', JSON.stringify(user));
    }
    private handleError(error : HttpErrorResponse)
    {
        let err = "An error occured";
            if(!error.error || !error.error.error)
                {
                 return throwError(err);
                }
                switch(error.error.error.errors[0].message)
                {
                    case 'EMAIL_EXISTS': err='Email already exists';
                        break;
                    case 'EMAIL_NOT_FOUND': err='Email does not exists';
                        break;
                    case 'INVALID_PASSWORD': err='The password or email does not match';
                        break;
                    default :  err = err +error.error.error.errors[0].message + error.error.error.code;
                }
                //
            return throwError(err);
    }
}