import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts;

  constructor(private service: PostService) {
  }

  ngOnInit() {
    this.service.getPosts()
    .subscribe(
      response => {
        this.posts = response;
    },
      err => {
        alert('An unexpected error ocurred.');
        console.log(err);
    })
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value };
    input.value = '';
    
    this.service.createPost(post)
      .subscribe(res => {
        this.posts.splice(0, 0, post);
        console.log(res);
      }, err => {
        alert('An unexpected error ocurred.');
        console.log(err);
      })
  }

  updatePost(post) {
    this.service.updatePost(post, { isRead: true })
      .subscribe(res => {
        console.log(res);
      }, err => {
        alert('An unexpected error ocurred.');
        console.log(err);
      })
  }

  deletePost(post) {
    this.service.deletePost(post.id)
      .subscribe(
        res => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
          console.log(res);
        },
        (err: Response) => {
          if (err.status === 404)
            alert('This post has already been deleted.');
          else {
            alert('An unexpected error ocurred.');
            console.log(err);
          }
        }
      );
  }

}
