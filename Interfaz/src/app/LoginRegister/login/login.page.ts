import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiNodeService } from 'src/app/Servicios/api-node.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  msg:any;

  constructor( private apiS: ApiNodeService, private router:Router,
              private alertController: AlertController) { }

  login(email:any, password:any){
    this.apiS.loginUser(email.value, password.value).subscribe({
      next: (datos:any)=>{

        this.msg = datos.message

        localStorage.setItem('apodo', datos.user.apodo)
        localStorage.setItem('foto', datos.user.avatar_id)
        localStorage.setItem('idUser', datos.user.id)

        this.router.navigate(['/tabs-inicio'])
      },
      error:(e:any)=>{
        debugger
        console.log(e);
      }
    })
  }
}
