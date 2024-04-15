import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';
import { shoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  // @Output() localIngredients =new EventEmitter<Ingredients>();
  // @Output() clearIngredients =new EventEmitter<void>();
  showErrorName = false; 
  showErrorAmount = false; 
  @ViewChild('inputIngName',{static: true}) name : ElementRef
  @ViewChild('inputAmount',{static: true}) amount : ElementRef
  localIngredients : Ingredients;
  constructor(private shoppingListService : shoppingListService)
  {

  }

  onAddClick(){        
    this.showErrorName =  this.name.nativeElement.value.trim()==='' ? true : false;
    this.showErrorAmount= this.amount.nativeElement.value.trim()==='' ? true : false;    
    if(this.name.nativeElement.value!='' && this.amount.nativeElement.value!='')
    {
      // this.localIngredients.emit({
      //   name:this.name.nativeElement.value,
      //   amount:this.amount.nativeElement.value
      // })
      this.localIngredients={name:this.name.nativeElement.value,amount:this.amount.nativeElement.value};
      this.shoppingListService.addIngredients(this.localIngredients);
    }
  }

  onDeleteClick(){

  }

  onClearClick(){
    // this.clearIngredients.emit();
    this.shoppingListService.clearIngredients();
  }
}
