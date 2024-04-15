import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipie-edit',
  templateUrl: './recipie-edit.component.html',
  styleUrl: './recipie-edit.component.css'
})
export class RecipieEditComponent {
  stackId : number;
  editMode = false;
  recipeForm : FormGroup;
  constructor(private activatedRoute : ActivatedRoute, private recipeService : RecipeService, private route : Router){}
  ngOnInit(){
    this.activatedRoute.params.subscribe(
      (param:Params)=>{
        this.stackId=+param['id'];
        this.editMode = param['id'] ? true : false;
        this.initForm();
      }
    )
  }

  private initForm()
  {
    let recipeName='';
    let recipeDesc='';
    let recipeImg='';
    let recipeIngredients = new FormArray([]);

    if(this.editMode)
    {
      const recipe = this.recipeService.getRecipeDetailsList(this.stackId);
      console.log(recipe);
      recipeName=recipe.name;
      recipeDesc=recipe.description;
      recipeImg=recipe.imagePath;
      if(recipe['ingredient'])
      {
        for (let ing of recipe.ingredient)
        {
          recipeIngredients.push(
          new FormGroup({
            'name': new FormControl(ing.name,Validators.required),
            'amount': new FormControl(ing.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImg,Validators.required),
      'description' : new FormControl(recipeDesc,Validators.required),
      'ingredient' : recipeIngredients
    })
  }

  get controls()
  {
    return (<FormArray>this.recipeForm.get('ingredient')).controls
  }

  addIngredient()
  {
    const control = new FormGroup({
      'name': new FormControl('',Validators.required),
      'amount': new FormControl('',[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (<FormArray>this.recipeForm.get('ingredient')).push(control)
  }

  onSaveRecipe(editMode : boolean)
  {
    if(editMode)
    {
      this.recipeService.updateRecipeAtindex(this.stackId, this.recipeForm.value)
    }
    else{      
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel()
  {
    this.route.navigate(['../'],{relativeTo : this.activatedRoute});
  }

  deleteIngredient(index : number)
  {
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
  }

}
