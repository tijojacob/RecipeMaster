import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
    @Input('recipe') recipe: Recipe;   
    // @Output('recipeSelected') recipeSelected = new EventEmitter<void>();
    onSelected(){
      // this.recipeSelected.emit();
      
      // this.recipeServiceList.onRecipeSelect.emit(this.recipe);
      this.recipeServiceList.onRecipeSelect.next(this.recipe);

    }
    constructor(private recipeServiceList : RecipeService)
    {

    }

}
