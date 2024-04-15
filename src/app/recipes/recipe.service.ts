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
    deleteRecipies: Recipe[]=[]; 
    private recipies : Recipe[]=[];   
    
      setRecipeFrmServer(recipe : Recipe[])
      {
        this.recipies=recipe;
        this.onRecipeUpdate.next(this.recipies.slice())
      }

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
      onRecipeUpdate = new Subject<Recipe[]>();

      
      onShoppingListAdd(e : Ingredients[])
      {
        this.shoppingListService.AddtoShoppingList(e);
      }

      addRecipe(recipe : Recipe)
      {
        this.recipies.push(recipe);
        this.onRecipeUpdate.next(this.recipies.slice());
      }

      updateRecipeAtindex(i: number,recipe:Recipe)
      {
        this.recipies[i]=recipe;
        this.onRecipeUpdate.next(this.recipies.slice())
      }

      deleteRecipeAtindex(i: number)
      {
        for(let j=0,k=0;j<this.recipies.length;j++)
        {
          if(i!==j)
          {
            this.deleteRecipies[k]=this.recipies[j];
            k++;
          }
        }
        this.recipies=this.deleteRecipies;
        this.deleteRecipies=[];
        this.onRecipeUpdate.next(this.recipies.slice())
      }

}