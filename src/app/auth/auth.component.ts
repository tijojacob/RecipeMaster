import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AUthResponseData, AUthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

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
    @ViewChild(PlaceholderDirective , {static : false}) alertHost : PlaceholderDirective;
    sub : Subscription;

    constructor(private authService : AUthService, private router : Router, private dataService : DataStorageService, private componentFactoryResolver : ComponentFactoryResolver){
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
                    this.showErrorAlert(this.succ);
                    this.dataService.error.next(this.succ);
                }
            }, err=>{
                this.showErrorAlert(err)
                this.dataService.error.next(err);
            })            
            f.reset();
            this.isLoading=false;
        //},2000);
    }  
    
    private showErrorAlert(message : string)
    {
        const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef
        hostViewContainerRef.clear();

        const compRef = hostViewContainerRef.createComponent(alertCompFactory);
        compRef.instance.message=message;
        this.sub=compRef.instance.close.subscribe(()=>{
            this.sub.unsubscribe();
            hostViewContainerRef.clear();
        })

    }

    ngOnDestroy()
    {
        if(this.sub)
        {
            this.sub.unsubscribe();
        }
    }
}