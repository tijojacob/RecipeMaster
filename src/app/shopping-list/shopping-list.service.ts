import { EventEmitter } from "@angular/core";
import { Ingredients } from "../shared/ingredients.model";
import { Subject } from "rxjs";

export class shoppingListService{
    ingredients: Ingredients[]=[new Ingredients(
        "Apple","10"
      ),
      new Ingredients(
        "Tomato","15"
      )];
    
    // ingredientsChanged = new EventEmitter<Ingredients[]>();
    ingredientsChanged = new Subject<Ingredients[]>();
      getIngredientList()
      {
        return this.ingredients.slice();
      }

      addIngredients(e: Ingredients)
      {
        this.ingredients.push(e);
        // this.ingredientsChanged.emit(this.ingredients);
        this.ingredientsChanged.next(this.ingredients);        
      }

      clearIngredients()
      {
        this.ingredients=[];
        // this.ingredientsChanged.emit(this.ingredients.slice());        
        this.ingredientsChanged.next(this.ingredients.slice());        
      }

      AddtoShoppingList(e : Ingredients[])
      {
        this.ingredients.push(...e);
        this.ingredientsChanged.next(this.ingredients.slice()); 
        // this.ingredientsChanged.emit(this.ingredients.slice()); 
      }
}