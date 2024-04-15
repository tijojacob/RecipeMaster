import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CourseProject';
  header: string='Recipe Book';
  onNavBarClick(element: string){
    //this.header=element;
  }
}
