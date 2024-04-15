import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';
import { shoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  // @Output() localIngredients =new EventEmitter<Ingredients>();
  // @Output() clearIngredients =new EventEmitter<void>();
  // showErrorName = false; 
  // showErrorAmount = false; 
  // @ViewChild('inputIngName',{static: true}) name : ElementRef
  // @ViewChild('inputAmount',{static: true}) amount : ElementRef
  localIngredients : Ingredients;  
  subscription : Subscription;
  @ViewChild('shoplistFrm',{static: true}) form : NgForm
  editedItemIndex : number =-1;
  editMode : boolean = false;
  
  ngOnInit()
  {    
    this.subscription=this.shoppingListService.editingStarted.subscribe((i:number)=>
    {
      this.editMode = true;
      this.editedItemIndex=i;
      this.localIngredients=this.shoppingListService.getIngredientListAtindex(i);
      this.form.setValue({
            'uname' : this.localIngredients.name,
            'amount' : +this.localIngredients.amount
      });
    });
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

  constructor(private shoppingListService : shoppingListService)
  {

  }

  onAddClick(shoplistFrm : NgForm){ 
    
    // this.showErrorName =  this.name.nativeElement.value.trim()==='' ? true : false;
    // this.showErrorAmount= this.amount.nativeElement.value.trim()==='' ? true : false;    
    // if(this.name.nativeElement.value!='' && this.amount.nativeElement.value!='')
    // {
    //   // this.localIngredients.emit({
    //   //   name:this.name.nativeElement.value,
    //   //   amount:this.amount.nativeElement.value
    //   // })
    //   this.localIngredients={name:this.name.nativeElement.value,amount:this.amount.nativeElement.value};
    //   this.shoppingListService.addIngredients(this.localIngredients);
    if(this.editedItemIndex>=0 && this.editMode)
    {
      this.localIngredients={name:shoplistFrm.value.uname,amount:shoplistFrm.value.amount};
      this.shoppingListService.updateIngredientListAtindex(this.localIngredients,this.editedItemIndex)      
    }
    else
    {
      this.localIngredients={name:shoplistFrm.value.uname,amount:shoplistFrm.value.amount};
      this.shoppingListService.addIngredients(this.localIngredients); 
    }
    this.onClearClick()
  }

  onDeleteClick(){
    this.shoppingListService.deleteIngredientListAtindex(this.editedItemIndex);
    this.onClearClick()
  }

  onClearClick(){
    // this.clearIngredients.emit();
    // this.shoppingListService.clearIngredients();
    this.editMode=false;
    this.editedItemIndex=-1;
    this.form.reset();
  }

}
