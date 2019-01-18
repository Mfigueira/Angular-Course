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

  constructor(private service: PostService) {}

  ngOnInit() {
    this.service.getAll()
    .subscribe(posts => {
        this.posts = posts,
        console.log(posts)
      });
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value };
    this.posts.splice(0, 0, post); // Optimistic Update Approach...

    input.value = '';
    
    this.service.create(post)
      .subscribe(newPost => {
        console.log(newPost);
      },
      (error: AppError) => {
        this.posts.splice(0, 1);

        if (error instanceof BadRequestError) {
          console.log(error, 'Bad Request...');
          // this.form.setErrors(error.originalError);
        } else throw error;
      })
  }

  updatePost(post) {
    this.service.update(post, { isRead: true })
      .subscribe(updatedPost => {
        console.log(updatedPost);
      });
  }

  // No devuelve error el server cuando borras un post mayor a 100...
  deletePost(post) {
    let index = this.posts.indexOf(post); // Optimistic Approach
    this.posts.splice(index, 1);

    this.service.delete(post.id)
      .subscribe(
        () => { console.log('Post Deleted Succesfully.') },
        (error: AppError) => {
          this.posts.splice(index, 0, post);

          if (error instanceof NotFoundError) {
            console.log('This post has already been deleted.');
            console.log('Error 1 is: ', error);
          } else throw error;
        });
  }

  testErrorsPost(invalid_id) {
    this.service.testErrors(invalid_id)
      .subscribe(
        response => {
          console.log('Response is: ', response);
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            console.log(`The post ${invalid_id} do not exist.`);
            console.log('Error 1 is: ', error);
          } else throw error;
        });
  }
}
