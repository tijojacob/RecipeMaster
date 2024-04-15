import { EventEmitter } from "@angular/core";
import { Ingredients } from "../shared/ingredients.model";
import { Subject } from "rxjs";

export class shoppingListService{
    deletedIngredients: Ingredients[]=[];
    ingredients: Ingredients[]=[new Ingredients(
        "Apple","10"
      ),
      new Ingredients(
        "Tomato","15"
      )];
    
    // ingredientsChanged = new EventEmitter<Ingredients[]>();
    ingredientsChanged = new Subject<Ingredients[]>();
    editingStarted = new Subject<number>();
      getIngredientList()
      {
        return this.ingredients.slice();
      }

      getIngredientListAtindex(i : number)
      {
        return this.ingredients[i];
      }

      updateIngredientListAtindex(ing : Ingredients, i : number)
      {
        this.ingredients[i]=ing;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredients(e: Ingredients)
      {
        this.ingredients.push(e);
        // this.ingredientsChanged.emit(this.ingredients);
        this.ingredientsChanged.next(this.ingredients);        
      }

      deleteIngredientListAtindex( i : number)
      {        
        for(let j=0,k=0;j<this.ingredients.length;j++)
        {
          if(i!==j)
          {
            this.deletedIngredients[k]=this.ingredients[j]
            k++;
          }
        }
        this.ingredients=[];
        this.ingredients=this.deletedIngredients;
        this.ingredientsChanged.next(this.ingredients.slice());
        this.deletedIngredients=[];
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