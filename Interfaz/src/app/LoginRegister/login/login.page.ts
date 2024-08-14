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

  constructor( private apiS: ApiNodeService, private router:Router,
              private alertController: AlertController) { }

  login(email:any, password:any){
    this.apiS.loginUser(email.value, password.value).subscribe({
      next: (datos:any)=>{

        localStorage.setItem('apodo', datos.user.apodo)
        localStorage.setItem('foto', datos.user.avatar_id)
        localStorage.setItem('idUser', datos.user.id)

        this.router.navigate(['/tabs-inicio'])
        this.presentAlert('Login Failed', 'Incorrect email or password.');
      },
      error:(e:any)=>{
        debugger
        console.log(e);
      }
    })
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();

  }
}
