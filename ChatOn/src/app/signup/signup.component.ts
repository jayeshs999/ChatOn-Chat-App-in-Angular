import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { Router} from'@angular/router'
import { THIS_EXPR, IfStmt } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 

  constructor(private auth:AuthserviceService,private router:Router) {
    
   
   }
  username:string;
  password:string;
  email:string;
  error:string;
  LoggedInUserID:any;
  user:any;

  signUp(){
    console.log("in signup");
    this.auth.signUp(this.email,this.username,this.password)
      .then(resolve=> {
        console.log(this.auth.currUserID);
        console.log(this.LoggedInUserID);
      })
        .catch((error)=>this.error=error.message);
  }
  ngOnInit(): void {
    this.user=this.auth.authUser();
    this.auth.authUser().subscribe(user=>{
      this.LoggedInUserID=user?user.uid:'';
      if(this.LoggedInUserID)
        this.router.navigate(['dashboard',this.LoggedInUserID]);
      
    });
    
  }

}
