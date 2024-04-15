import { Component, EventEmitter, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AUthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector:"app-header",
    templateUrl:"./header.component.html",
    styles:[`
    .nav-link.active {
        color: blue;
    }
    `]
})

export class HeaderComponent{
// @Output('isHeaderClick') headerClick = new EventEmitter<string>();  
    subscription : Subscription;
    isAuthenticated =false;

    constructor(private dataStorage : DataStorageService, private authService : AUthService){
        this.subscription=this.authService.user.subscribe((user)=>{
            this.isAuthenticated = !!user;
        });
    }

    // ngOnInit()
    // {
    //     this.subscription=this.authService.user.subscribe((user)=>{
    //         this.isAuthenticated = !!user;
    //         console.log(!user,!!user);
    //     });
    // }

    // onHeaderClick(e: string){
    //     this.headerClick.emit(e)
    // }

    headerSave(){
        this.dataStorage.storeRecipe();
    }

    fetchData(){
        this.dataStorage.fetchData().subscribe(()=>{},error=>{
            this.dataStorage.error.next(error.message + ((error.error) ? ((error.error.error) ? error.error.error : '') : ''));
        });
    }
    
    ngOnDestroy()
    {
        this.subscription.unsubscribe();
    }

    logOut()
    {
        this.authService.logOut();
    }
}