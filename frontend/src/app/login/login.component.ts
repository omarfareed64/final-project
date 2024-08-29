import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  author={
    email:'',
    password:''
  }
  token:any;
  constructor(private _auth:AuthService,private router:Router) { };
  ngOnInit(): void {};
  login(){
    this._auth.login(this.author).subscribe(
      res=>{
        this.token=res;
        localStorage.setItem('token',this.token.mytoken);
        this.router.navigate(['/home']);
      },
      error=>{
        console.log(error);
        alert('Invalid email or password');
      }
    )
  }

}
