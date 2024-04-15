import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  subs : Subscription;
  // @Output() recipeSelect2 = new EventEmitter<Recipe>();
  recipesList : Recipe[]=[];
  constructor(private recipeListService : RecipeService)
  {
   this.subs= recipeListService.onRecipeUpdate.subscribe(()=>{
      this.recipesList=this.recipeListService.getRecipeList()
    })
  }

  ngOnInit()
  {
    this.recipesList=this.recipeListService.getRecipeList();
  }
  // onRecipeSelect(recipeEl : Recipe)
  // {
  //   this.recipeSelect2.emit(
  //     recipeEl
  //   )
  // }

  ngOnDestroy()
  {
    this.subs.unsubscribe();
  }
}
