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
export class DataService {

  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url)
      .pipe(catchError(this.handleError));
  }

  create(resource) {
    // Error testing
    // return throwError(new BadRequestError);
    return this.http.post(this.url, resource)
      .pipe(catchError(this.handleError));
  }

  update(resource, args) {
    return this.http.patch(this.url + '/' + resource.id, args)
      .pipe(catchError(this.handleError));
  }

  // No devuelve error el server cuando borras un post mayor a 100...
  delete(id) {
    // Error testing
    // return throwError(new AppError);
    return this.http.delete(this.url + '/' + id)
      .pipe(catchError(this.handleError));    
  }

  testErrors(id) {
    return this.http.get(this.url + '/' + id)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    if (error.status === 404) {
      return throwError(new NotFoundError());
    } else if (error.status === 400) {
      return throwError(new BadRequestError(error));
    } else {
      return throwError(new AppError(error));
    }
  }
}