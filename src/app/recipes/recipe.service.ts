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
    recipies: Recipe[]=[new Recipe(
        "Big Mac",
        "Macdonals",
        "https://cdn-icons-png.flaticon.com/128/737/737967.png",
        [new Ingredients('Patty','30'),new Ingredients('Cookie','15')]
      ),
      new Recipe(
        "Double Big Mac",
        "Added Value",
        "https://cdn-icons-png.flaticon.com/128/1037/1037762.png",
        [new Ingredients('Double Patty','60'),new Ingredients('Baecon','25')]
      )]
    
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