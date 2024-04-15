import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Subject, catchError, exhaustMap, map, take, tap, throwError } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { AUthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService{
    error = new Subject<string>();
    constructor(private http : HttpClient, private recipeService : RecipeService, private authService : AUthService)
    {

    }

    storeRecipe(){
        const recipes = this.recipeService.getRecipeList();
        this.http.put("https://ng-complete-guide-db0c7-default-rtdb.firebaseio.com/recipes.json",recipes)
        .subscribe((response)=>{
            console.log(response);
        },error=>{
            this.error.next(error.message + error.error.error);
        })
    }

    fetchData()
    {        
        return this.http.get<Recipe[]>("https://ng-complete-guide-db0c7-default-rtdb.firebaseio.com/recipes.json"
        ).pipe(map(recipe=>{
        return recipe.map(recipe=>{
            return {
                ...recipe,
                ingredient : recipe.ingredient ? recipe.ingredient : []
            }
        });
        }),tap((data)=>{
            this.recipeService.setRecipeFrmServer(data);
        })        
        );                
    }
}