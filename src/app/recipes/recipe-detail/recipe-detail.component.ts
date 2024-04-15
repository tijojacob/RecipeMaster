import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredients } from '../../shared/ingredients.model';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  @Input() recipeSelectDetails : Recipe
  
  constructor(private recipeListService : RecipeService )
  {

  }
  AddtoShoppingList(ingredient : Ingredients[])
  {
    this.recipeListService.onShoppingListAdd(ingredient);
  }
}
