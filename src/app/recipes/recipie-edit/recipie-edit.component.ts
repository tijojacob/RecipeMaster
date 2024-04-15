import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipie-edit',
  templateUrl: './recipie-edit.component.html',
  styleUrl: './recipie-edit.component.css'
})
export class RecipieEditComponent {
  stackId : number;
  editMode = false
  constructor(private activatedRoute : ActivatedRoute){}
  ngOnInit(){
    this.activatedRoute.params.subscribe(
      (param:Params)=>{
        this.stackId=+param['id'];
        this.editMode = param['id'] !== null ? true : false
      }
    )
  }
}
