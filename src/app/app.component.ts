import { Component } from '@angular/core';
import { DataStorageService } from './shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AUthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CourseProject';
  header: string='Recipe Book';
  err='';
  sub : Subscription;
  constructor(private dataStorageService : DataStorageService, private authService : AUthService){
    this.sub=this.dataStorageService.error.subscribe(
      error=>{
        this.err=error;
      }
    )
    
    this.authService.autoLogin();    
  }

  ngOndestroy()
  {
    this.sub.unsubscribe();
  }
}
