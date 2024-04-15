
import { RouterModule,Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { shoppingListService } from './shopping-list/shopping-list.service';
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipieEditComponent } from "./recipes/recipie-edit/recipie-edit.component";

const appRoute : Routes=[
    {path:'',redirectTo:'recipes',pathMatch:'full'},
    {path:'recipes',component:RecipesComponent,
      children :[
        {path:'',component:RecipeStartComponent},
        {path:'new',component:RecipieEditComponent},
        {path:':id',component:RecipeDetailComponent},
        {path:':id/edit',component:RecipieEditComponent},
        // children: [{path:'recipe-item',component:RecipeItemComponent}]}
      ]},
    {path:'shopping-list',component:ShoppingListComponent,
      children: [{path:'shopping-edit',component:ShoppingEditComponent}]
    },
    { path : '**' ,component : HeaderComponent}
  ]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoute)
    ],
    exports : [RouterModule]
})

export class AppRoutingModule{

}