import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://127.0.0.1:3000/author/';

  constructor(private http: HttpClient) { }

  register(author: any): Observable<any> {
    return this.http.post(this.url + 'register', author);
  }
  login(author: any): Observable<any> {
    return this.http.post(this.url + 'login', author);
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    else {
      return false;
    }
  }
  getAuthorDataFromToken() {
    let token = localStorage.getItem('token');

    if (token) {
      let data = JSON.parse(window.atob(token.split('.')[1]));
      // Access author data here, e.g., data.name, data.email
      return data;
    }
  }
  getById(id: any): any {
    return this.http.get(this.url + 'getbyid/' + id);
  }
}
