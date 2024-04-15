import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  providers:[RecipeService]
})
export class RecipesComponent {
   
  selectedRecipe : Recipe;

  constructor(private recipeListService : RecipeService)
  {

  }
  ngOnInit(){
    this.recipeListService.onRecipeSelect.subscribe((recipeSelectedDetails:Recipe)=>(this.selectedRecipe=recipeSelectedDetails));
  }

}
