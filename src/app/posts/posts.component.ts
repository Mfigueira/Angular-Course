import { BadRequestError } from './../common/bad-request-error';
import { AppError } from './../common/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { NotFoundError } from '../common/not-found-error';

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
      error => {
        console.log('An unexpected error ocurred: ', error);
    })
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value };
    input.value = '';
    
    this.service.createPost(post)
      .subscribe(res => {
        this.posts.splice(0, 0, post);
        console.log(res);
      }, (err: AppError) => {
        if (err instanceof BadRequestError) {
          console.log(err, 'Bad Request...');
          // this.form.setErrors(error.originalError);
        } else {
          console.log(err, 'An unexpected error ocurred.');
        }
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

  // No devuelve error el server cuando borras un post mayor a 100...
  deletePost(post) {
    this.service.deletePost(post.id)
      .subscribe(
        response => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
          console.log('Response is: ', response);
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            console.log('This post has already been deleted.');
            console.log('Error 1 is: ', error);
          }
          else {
            console.log('An unexpected error ocurred.');
            console.log('Error 2 is: ', error);
          }
        }
      );
  }

  testErrorsPost(invalid_id) {
    this.service.testErrorsPost(invalid_id)
      .subscribe(
        response => {
          console.log('Response is: ', response);
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            console.log(`The post ${invalid_id} do not exist.`);
            console.log('Error 1 is: ', error);
          }
          else {
            console.log('An unexpected error ocurred.');
            console.log('Error 2 is: ', error);
          }
        }
      );
  }
}
