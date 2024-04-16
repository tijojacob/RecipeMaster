import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";
import { RecipieEditComponent } from "./recipie-edit/recipie-edit.component";
import { RecipiesResolverService } from "./recipies-resolver.service";

const recipeRoutes : Routes=[
    {path:'',component:RecipesComponent, canActivate:[AuthGuard],
      children :[
        {path:'',component:RecipeStartComponent},
        {path:'new',component:RecipieEditComponent},
        {path:':id',component:RecipeDetailComponent, resolve:[RecipiesResolverService]},
        {path:':id/edit',component:RecipieEditComponent, resolve:[RecipiesResolverService]},
        // children: [{path:'recipe-item',component:RecipeItemComponent}]}
      ]},
]

@NgModule({
    imports:[RouterModule.forChild(recipeRoutes)],
    exports :[RouterModule]
})

export class RecipesRoutingModule{

}