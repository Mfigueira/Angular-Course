import { FollowersService } from './../services/followers.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-followers',
  templateUrl: './my-followers.component.html',
  styleUrls: ['./my-followers.component.css']
})
export class MyFollowersComponent implements OnInit {

  myFollowers;

  constructor(private service: FollowersService) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(
        response => {
          this.myFollowers = response;
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )
  }

}
