import { Component, OnInit } from '@angular/core';
import {ChatserviceService}  from'../../services/chatservice.service';
import {AuthserviceService} from '../../services/authservice.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class DashboardComponent implements OnInit {

  constructor(private chatservice:ChatserviceService,private authservice:AuthserviceService,private router:Router) {}
  users;
  currUserEmail;
  currUserID;
  ngOnInit(): void {
    this.authservice.authUser().subscribe(user=>
      {
        this.currUserEmail=user?user.email:'';
        this.currUserID=user?user.uid:'';
  });
    this.chatservice.getUsers().valueChanges().subscribe(list=>{
      this.users=list;
    });

  }

  openChat(userid){
    console.log("in openchat")
    this.router.navigate(['dashboard',this.currUserID,userid,{senderID:this.currUserID}])
  }
  

}
