import { BadRequestError } from './../common/bad-request-error';
import { NotFoundError } from './../common/not-found-error';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../common/app-error';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(this.url);
  }

  createPost(post) {
    return this.http.post(this.url, post)
      .pipe(catchError((error: Response) => {
        if (error.status === 400) {
          return throwError(new BadRequestError(error));
        } else {
          return throwError(new AppError(error));
        }
      }))
  }

  updatePost(post, args) {
    return this.http.patch(this.url + '/' + post.id, args);
  }

  // No devuelve error el server cuando borras un post mayor a 100...
  deletePost(id) {
    return this.http.delete(this.url + '/' + id);
  }

  testErrorsPost(id) {
    return this.http.get(this.url + '/' + id)
      .pipe(catchError((error: Response) => {
        if (error.status === 404) {
          return throwError(new NotFoundError());
        } else {
          return throwError(new AppError(error));
        }
      }));
  }
}
