import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private user:Observable<firebase.User>;
  private authState:any;
  private loggedUserID:any;

  constructor(private afAuth:AngularFireAuth,private db:AngularFireDatabase,private router:Router) {
    this.user=afAuth.authState;
    this.user.subscribe(user1=> this.loggedUserID=user1?user1.uid:'');
   }
   get loggedUserId(){
     return this.loggedUserID;
   }

   authUser(){
     return this.user;
   }

   get currUserID(){
    return this.authState!==null? this.authState.user.uid :'';
   }

   login(email:string,password:string){
      return this.afAuth.signInWithEmailAndPassword(email,password)
        .then((user) => {
          this.authState=user;
        console.log(this.afAuth.authState.subscribe(user1=>console.log(user1.uid)));
          this.setUserStatus('online');
          this.router.navigate(['dashboard',this.currUserID]);
        })
   }

   setUserStatus(status:string){
     const path=`users/${this.currUserID}`;
     const data={
       status:  status
     };

     this.db.object(path).update(data)
      .catch(error=>console.log(error));
   }


   logout(){
     
     this.afAuth.signOut().then(x=>{
      this.setUserStatus("offline");
     });

     this.router.navigate(['login']);
   }

   setUserData( email:string ,username:string,  password:string,status:string ){
     console.log("in sertUserData");
      const path=`users/${this.currUserID}`;

      const data={
        username:username,
        email:email,
        password:password,
        status:status,
        userid:this.currUserID
      };

      this.db.object(path).update(data)
        .catch(error=> console.log(error));

   }

   signUp(email:string,username:string,password:string){
    return this.afAuth.createUserWithEmailAndPassword(email,password)
      .then((user)=>{
        this.authState=user;
       
        this.afAuth.authState.subscribe(user1=>console.log(user1.uid));
        const status='online';
        this.setUserData(email,username,password,status)
      })

   }
}
