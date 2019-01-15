import { Component } from '@angular/core';
import { FavChangeEventArgs } from './favorite/favorite.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular app';
  courses: number[] = [1, 2];
  coursesCourses: object[] = [];
  viewMode = 'map';

  post = {
    title: "Title",
    isFav: true
  }

  tweet = {
    body: 'Here is the body of a tweet...',
    isLiked: true,
    likesCount: 10
  }

  onFavChange(eventArgs: FavChangeEventArgs) {
    console.log('Fav changed! ', eventArgs)
  }

  onAdd() {
    this.coursesCourses.push({id:4, name:'course4'});
  }
  onRemove(course: object) {
    let index = this.coursesCourses.indexOf(course);
    this.coursesCourses.splice(index, 1);
  }

  loadCourses() {
    this.coursesCourses = [
      {id: 1, name: 'course1'},
      {id: 2, name: 'course2'},
      {id: 3, name: 'course3'}
    ]
  }

  trackCourse(course) {
    return course ? course.id : undefined;

  }
}
