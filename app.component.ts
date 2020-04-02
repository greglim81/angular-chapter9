import { Component } from '@angular/core';
import { GitHubService } from './github.service'; 
import { filter,debounceTime,distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `  
  <input class="form-control" type="search" [formControl]="searchControl">
  <h3>GitHub User Results</h3>    
  <div *ngIf="isLoading">
    <i class="fa fa-spinner fa-spin fa-3x"></i>
  </div>    
  <div *ngFor="let user of users" class="media">
    <div class="media">
      <a href="{{ user.html_url }}">
        <img src="{{ user.avatar_url }}" class="mr-4" alt="..." width="64" height="64">
      </a>
      <div class="media-body">
        <h5 class="mt-0">{{ user.login }}</h5>
        Score: {{ user.score }}
      </div>
    </div>
  </div>  
  `,
  providers: [GitHubService]
})
export class AppComponent {
  searchControl = new FormControl();  
  isLoading = false;

  users = [];  

  constructor(private _githubService: GitHubService){
  }

  ngOnInit() {
    this.searchControl.valueChanges
        .pipe(filter(text => text.length >= 3), debounceTime(400),distinctUntilChanged())                
        .subscribe(value => {
          this.isLoading = true; 
          this._githubService.getGitHubData(value)
                .subscribe(data => {
                  this.isLoading = false;        
                  this.users = data.items;                    
          });                                  
    });          
  }
}  
