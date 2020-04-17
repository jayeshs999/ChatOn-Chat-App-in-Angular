import { Component, OnInit } from '@angular/core';
import {AuthserviceService} from '../../services/authservice.service';
import {Router} from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice:AuthserviceService,private router:Router) {
    
   }

  email:string;
  password:string;
  errorMsg:string;
  currUserId:string;
  user:any;
  login(){
    this.authservice.login(this.email,this.password)
      .then(resolve=>this.router.navigate(['dashboard',this.authservice.currUserID]))
        .catch(error=>this.errorMsg=error.message);
  }
  ngOnInit(): void {
    this.user=this.authservice.authUser();
    this.authservice.authUser().subscribe(user=>{
      this.currUserId=user?user.uid:'';
      if(this.currUserId){
        this.router.navigate([`dashboard/${this.currUserId}`]);
      }
    });
    
  }

}
