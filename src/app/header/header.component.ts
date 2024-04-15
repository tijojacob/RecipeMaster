import { Component, EventEmitter, Output } from "@angular/core";

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
@Output('isHeaderClick') headerClick = new EventEmitter<string>();  

    onHeaderClick(e: string){
        this.headerClick.emit(e)
    }
    
}