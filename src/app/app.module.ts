import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { RouterModule, Routes } from '@angular/router';

const appRoute : Routes=[
  {path:'',component:HeaderComponent},
  {path:'recipes',component:RecipesComponent,
    children :[
      {path:'recipe-list',component:RecipeListComponent,
      children: [{path:'recipe-item',component:RecipeItemComponent}]}
    ]},
  {path:'shopping-list',component:ShoppingListComponent,
    children: [{path:'shopping-edit',component:ShoppingEditComponent}]
  },
  { path : '**' ,component : HeaderComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [shoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
