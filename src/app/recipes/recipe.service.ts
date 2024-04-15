import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredients } from "../shared/ingredients.model";
import { shoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

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

      getRecipeDetailsList(index : number)
      {        
        return this.recipies[index];
      }

      // onRecipeSelect = new EventEmitter<Recipe>();
      onRecipeSelect = new Subject<Recipe>();

      
      onShoppingListAdd(e : Ingredients[])
      {
        this.shoppingListService.AddtoShoppingList(e);
      }
}