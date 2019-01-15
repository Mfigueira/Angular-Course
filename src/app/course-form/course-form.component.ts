import { Component } from '@angular/core';

@Component({
  selector: 'course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent {

  log(x) {
    console.log(x);
  }

  submit(x) {
    console.log(x);
  }

  courseCategories = [
    { id:1, name: 'Development' },
    { id:2, name: 'Art' },
    { id:3, name: 'Languages' }
  ]

}
