import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations :[
        AuthComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(
            [
                {path:'auth',component:AuthComponent},
                {path : '**' ,redirectTo:'recipes'},
            ])
    ],
    exports : [RouterModule]
})

export class AuthModule{

}