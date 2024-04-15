import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { AuthGuard } from "./auth/auth.guard";
import { AUthService } from "./auth/auth.service";
import { RecipeService } from "./recipes/recipe.service";
import { RecipiesResolverService } from "./recipes/recipies-resolver.service";
import { DataStorageService } from "./shared/data-storage.service";
import { shoppingListService } from "./shopping-list/shopping-list.service";

@NgModule({
    providers:[
        shoppingListService, 
        RecipeService, 
        DataStorageService,
        RecipiesResolverService, 
        AUthService,
        {   provide : HTTP_INTERCEPTORS, 
            useClass : AuthInterceptorService, 
            multi : true
        },
        AuthGuard
    ],
})

export class CoreModule{

}