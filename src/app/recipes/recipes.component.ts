import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
   
  selectedRecipe : Recipe;

  constructor(private dataStorage : DataStorageService)
  {

  }
  ngOnInit(){
    this.dataStorage.fetchData().subscribe(()=>{},error=>{
      this.dataStorage.error.next(error.message + ((error.error) ? ((error.error.error) ? error.error.error : '') : ''));
  });
  }

}
