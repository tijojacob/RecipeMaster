import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredients } from "../shared/ingredients.model";
import { shoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{

    constructor(private shoppingListService : shoppingListService)
    {

    }

    recipies: Recipe[]=[]
    
      getRecipeList()
      {
        return this.recipies.slice();
      }

      onRecipeSelect = new EventEmitter<Recipe>();
      
      onShoppingListAdd(e : Ingredients[])
      {
        this.shoppingListService.AddtoShoppingList(e);
      }
}