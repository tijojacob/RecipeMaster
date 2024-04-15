import { Injectable } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable()
export class RecipiesResolverService implements Resolve<Recipe[]>
{
    constructor(private dataStoraage : DataStorageService, private recipeService : RecipeService)
    {

    }
    resolve (route: ActivatedRouteSnapshot,state : RouterStateSnapshot)
    {
        const recipe = this.recipeService.getRecipeList();
        if(recipe.length===0)
        {
            return this.dataStoraage.fetchData();
        }
        else{
            return recipe;
        }
    }

}