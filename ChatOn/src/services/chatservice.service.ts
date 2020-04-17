import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

  currUserID:any;
  constructor(private afAuth:AngularFireAuth,private db:AngularFireDatabase,private router:Router) {
    this.afAuth.authState.subscribe(user=>{
      if(user)
        this.currUserID=user.uid;
    })
   }


getUsers(){
  const path="/users";

  return this.db.list(path);
}

sendMessage(receiverID:string,message:string){
  const path1=`/messages/${this.currUserID}/${receiverID}/messagelist`;
  const pathlast1=`/messages/${this.currUserID}/${receiverID}/lastmessage`;
  const data1={
    message:message,
    type:"sent",
    time:Date.now()
  }
  this.db.object(pathlast1).update(data1);
  this.db.list(path1).push(data1);


  const path2=`/messages/${receiverID}/${this.currUserID}/messagelist`;
  const pathlast2=`/messages/${receiverID}/${this.currUserID}/lastmessage`
  const data2={
    message:message,
    type:"received",
    time:Date.now()
  }
  this.db.object(pathlast2).update(data2);
  this.db.list(path2).push(data2);

}

getMessages(senderID:string,receiverID:string){
  const path=`/messages/${senderID}/${receiverID}/messagelist`;
  console.log(path);
  return this.db.list(path);
}






}


