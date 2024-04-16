import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

const shippingListRoutes : Routes=[
    {path:'',component:ShoppingListComponent,
      children: [{path:'shopping-edit',component:ShoppingEditComponent}]
    },
]

@NgModule({
    imports: [RouterModule.forChild(shippingListRoutes)],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule{

}