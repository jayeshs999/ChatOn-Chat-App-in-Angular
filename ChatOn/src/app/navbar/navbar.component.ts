import { Component, OnInit } from '@angular/core';
import {AuthserviceService} from '../../services/authservice.service'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Observable<firebase.User>;
  userEmail: string;
  constructor(private authservice:AuthserviceService) { }

  ngOnInit(): void {
    this.user = this.authservice.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    });
  }
  logout(){
    this.authservice.logout();

  }

}
