import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css'] // Correct typo here
})
export class CreatearticleComponent implements OnInit {

  article = {
    title: '',
    content: '',
    tags: [] as string[],
    description: '',
  }
  tag: string = '';
  image: any;

  constructor(private _auth: AuthService, private _data: DataService,private router:Router) {}

  ngOnInit(): void {
    // Add any initialization logic here if needed
  }

  select(event: any) {
    this.image = event.target.files[0];
  }

  addTag() {
    if (this.tag) {
      this.article.tags.push(this.tag);
      this.tag = ''; // Clear input after adding tag
    }
  }

  create() {
    let fd = new FormData();
    fd.append('title', this.article.title);
    fd.append('content', this.article.content);
    fd.append('description', this.article.description);
    fd.append('tags', this.article.tags.toString());
    fd.append('image', this.image);
    fd.append('idAuthor', this._auth.getAuthorDataFromToken().id);

    this._data.create(fd).subscribe({
      next: (response) => {
        console.log('Article created successfully:', response);
        this.router.navigate(['/home']); // Navigate to home after success
      },
      error: (err) => {
        console.error('Error creating article:', err);
      }
    });
  }    
}
