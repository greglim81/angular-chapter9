import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core'; 

export interface GitHubUser{
    html_url: string;
    avatar_url: string;
    login: string;
    score: string;        
}

@Injectable() 
export class GitHubService{
    constructor(private _http: HttpClient){

    }

    getGitHubData(_searchTerm):Observable<GitHubUser>{
      return this._http.get<GitHubUser>
        ("https://api.github.com/search/users?q="+_searchTerm);                    
    }
}
