import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  author={
    name: '',
    lastName: '',
    email: '',
    password: '',
    about: '',
  }

  image: any;

  select(e:any){
    this.image = e.target.files[0];
  }
  constructor(private _auth:AuthService,private router:Router) { };
  ngOnInit(): void {};

  register()
  {

    let fd = new FormData();
    fd.append('name', this.author.name);
    fd.append('lastName', this.author.lastName);
    fd.append('email', this.author.email);
    fd.append('password', this.author.password);
    fd.append('about', this.author.about);
    fd.append('image', this.image);
    this._auth.register(fd).subscribe(
      res=>{
        this.router.navigate(['/login'])
      }
    )
  

  }
}