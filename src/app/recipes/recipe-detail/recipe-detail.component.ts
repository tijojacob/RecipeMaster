import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredients } from '../../shared/ingredients.model';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  // @Input() recipeSelectDetails : Recipe

  recipeSelectDetails : Recipe
  recipeId : number;
  
  constructor(private recipeListService : RecipeService, private activatedRoute : ActivatedRoute )
  {
    activatedRoute.params.subscribe(
      (params : Params)=>{
        this.recipeId=+params['id'];
        this.recipeSelectDetails=recipeListService.getRecipeDetailsList(+params['id']);
      }
    )
  }
  AddtoShoppingList(ingredient : Ingredients[])
  {
    this.recipeListService.onShoppingListAdd(ingredient);
  }

  ngOnInit()
  {
    //console.log(this.activatedRoute.snapshot.params['id']);
  }

  onRecipeDelete()
  {
    this.recipeListService.deleteRecipeAtindex(this.recipeId);
  }

}
