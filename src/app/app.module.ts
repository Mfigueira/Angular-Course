import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
//Components
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { MoviesComponent } from './movies/movies.component';
import { LikeComponent } from './like/like.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { PostsComponent } from './posts/posts.component';
//Services
import { CoursesService } from './services/courses.service';
import { PostService } from './services/post.service';
//Pipes
import { SummaryPipe } from './pipes/summary.pipe';
import { TitleCasePipe } from './pipes/title-case.pipe';
//FontAwesome Icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';



@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    CoursesComponent,
    CourseComponent,
    SummaryPipe,
    FavoriteComponent,
    MoviesComponent,
    TitleCasePipe,
    LikeComponent,
    ContactFormComponent,
    CourseFormComponent,
    PostsComponent
  ], // Here goes the components
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule
  ], // Here goes Angular Modules into the App Module
  providers: [
    CoursesService,
    PostService
  ], // Here goes the dependencies to inject upon objects
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faStarHalfAlt, faStar, faHeart);
  }
}
