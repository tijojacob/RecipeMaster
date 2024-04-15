import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinner } from "./loading-spinner.componen";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinner,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports:[
        CommonModule,RouterModule
    ],
    exports:[
        AlertComponent,
        LoadingSpinner,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule,
        RouterModule
    ]
})
export class SharedModule{

}