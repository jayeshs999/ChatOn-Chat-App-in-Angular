import { Component, OnInit } from '@angular/core';
import {ChatserviceService} from '../../services/chatservice.service';
import {ActivatedRoute, Router} from '@angular/router';
import { relative } from 'path';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css','../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class ChatboxComponent implements OnInit {
  message:string;
  senderID:string;
  receiverID:string;
  messages;
  constructor(private chatservice:ChatserviceService,private route:ActivatedRoute,private router:Router) { 
    
  }

  ngOnInit(): void {
    console.log("in chatbox");
    this.route.paramMap.subscribe(params=>{
      this.senderID=params.get('senderID');
      console.log(this.senderID);
      this.receiverID=params.get('receiverID');
      this.chatservice.getMessages(this.senderID,this.receiverID).valueChanges().subscribe(list=>
        this.messages=list);
       // document.getElementById("mainchatbox").scrollTop=document.getElementById("mainchatbox").scrollHeight+document.getElementById("mainchatbox").scrollHeight;
    });

    
   
    
  } 

  sendMessage(){
    console.log("in send message");
    this.chatservice.sendMessage(this.receiverID,this.message);
    document.getElementById("mainchatbox").scrollTop=document.getElementById("mainchatbox").scrollHeight+document.getElementById("mainchatbox").scrollHeight;
    this.router.navigate(['dashboard',this.senderID,this.receiverID,{senderID:this.senderID}]);
  }

}
