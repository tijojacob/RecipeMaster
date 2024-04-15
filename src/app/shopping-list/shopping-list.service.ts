import { EventEmitter } from "@angular/core";
import { Ingredients } from "../shared/ingredients.model";

export class shoppingListService{
    ingredients: Ingredients[]=[new Ingredients(
        "Apple","10"
      ),
      new Ingredients(
        "Tomato","15"
      )];
    
    ingredientsChanged = new EventEmitter<Ingredients[]>();

      getIngredientList()
      {
        return this.ingredients.slice();
      }

      addIngredients(e: Ingredients)
      {
        this.ingredients.push(e);
        this.ingredientsChanged.emit(this.ingredients);
      }

      clearIngredients()
      {
        this.ingredients=[];
        this.ingredientsChanged.emit(this.ingredients.slice());        
      }

      AddtoShoppingList(e : Ingredients[])
      {
        this.ingredients.push(...e);
        this.ingredientsChanged.emit(this.ingredients.slice()); 
      }
}