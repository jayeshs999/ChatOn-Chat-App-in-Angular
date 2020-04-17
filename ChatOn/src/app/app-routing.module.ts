import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatboxComponent } from './chatbox/chatbox.component';


const routes: Routes = [
 { path:'signup', component: SignupComponent},
  {path: 'login',component:LoginComponent},
  {path :'dashboard/:userID', component:DashboardComponent,
  children:[
    {path:':receiverID',component:ChatboxComponent}
  ]
          
},
  {path: '', redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
