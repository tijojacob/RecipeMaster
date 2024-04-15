import { Component, OnChanges } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { shoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
  //providers:[shoppingListService]
})
export class ShoppingListComponent {
  // ingredients: Ingredients[]=[new Ingredients(
  //   "Apple","10"
  // ),
  // new Ingredients(
  //   "Tomato","15"
  // )];
  ingredients : Ingredients[]=[]
  constructor(private shoppingListService : shoppingListService)
  {

  }

  ngOnInit()
  {
    this.ingredients=this.shoppingListService.getIngredientList();
    this.shoppingListService.ingredientsChanged.subscribe(
      (ingredientList : Ingredients[])=>{
        this.ingredients = ingredientList;
      }
    )
  }

  // onIngredientsAdd(e : Ingredients)
  // {
  //   this.ingredients.push(e);
  // }

  // onClearIngredients()
  // {
  //   this.ingredients=[];
  // }

}
