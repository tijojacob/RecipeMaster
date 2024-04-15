import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AUthResponseData, AUthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html',
    styleUrl:'./auth.component.css'
})
export class AuthComponent{
    isLoginMode = true;
    isLoading=false;
    loginBtnText = ''
    switchBtnText = ''
    err = '';
    succ = '';
    auth: Observable<AUthResponseData>

    constructor(private authService : AUthService, private router : Router){
        this.isLoginMode=true;
        this.loginBtnText= 'Login';
        this.switchBtnText = 'Switch to SignUp';
    }
    onSwitchClick(f : NgForm)
    {
        this.isLoginMode =! this.isLoginMode;
        this.loginBtnText= this.isLoginMode ? 'Login' : 'SignUp'
        this.switchBtnText = 'Switch to '+(this.isLoginMode ? 'SignUp' : 'Login')
        f.reset();
        this.succ='';
        this.err = '';
    }

    onSubmit(f:NgForm)
    {
        this.err = '';
        if(!f.valid)
        {
            return;
        }
        const email = f.value.email;
        const pwd = f.value.password;
        this.isLoading=true;
        if(!this.isLoginMode)
        {      
            this.auth = this.authService.signup(email,pwd);
        }
        else
        {
            this.auth = this.authService.signIn(email,pwd);
        }
        //setTimeout(()=>{                 
            this.auth.subscribe((respData)=>{
                console.log(respData);
                if(respData.registered)
                {
                    this.router.navigate(['/recipes'])
                }
                else if(respData.localId){
                    this.succ='Registration Successful; Please Login.'
                }
            }, err=>{
                this.err = err;
            })            
            f.reset();
            this.isLoading=false;
        //},2000);
    }  
    
}