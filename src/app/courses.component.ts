import { Component } from '@angular/core';
import { CoursesService } from './services/courses.service';

@Component({
    selector: 'courses', // <courses>
    template: `
        <h2>{{ title }}</h2>

        <div (click)="onDivClicked()">

            <button (click)="onSave($event)" class="btn" [class.btn-dark]="isDark" [style.width]="isLarge ? '10em' : '5em'">Go</button>

            <input [(ngModel)]="email" (keyup.enter)="onKeyUp(email.value)" />

        </div>

        <ul>
            <li *ngFor="let course of courses">
                {{ course }}
            </li>
        </ul>

        <p>{{ text | summary:60 }}</p>
    ` // HTML markup to render
})
export class CoursesComponent {
    title = "List of courses";
    courses;
    email = 'sdadasdsa@com.com';

    text = "Lorem uewnpxa usau hsuiasdu nwna ndusaidmak ewan usdan owa sdnand sa iodnsaid asui";

    isDark = true;
    isLarge = true;

    constructor(service: CoursesService) {
        this.courses = service.getCourses();
    }

    onSave($event) {
        $event.stopPropagation();
        alert("Button was clicked!");
        console.log($event);
    }

    onDivClicked() {
        console.log("Div Clicked.");
    }

    onKeyUp() {
        alert(this.email);
    }
}
