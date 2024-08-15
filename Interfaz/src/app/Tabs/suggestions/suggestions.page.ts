import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ApiNodeService } from 'src/app/Servicios/api-node.service';


@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage {

  feedbackForm: FormGroup;
  idUser: any = localStorage.getItem('idUser')

  constructor(
    private alertController: AlertController,
    private apis:ApiNodeService
  ) {
    
  }

  async enviarComentario(comentario:any) {

      // Enviar los datos al backend
      this.apis.createSugerencia(comentario.value, this.idUser).subscribe(
        async response => {
          // Mostrar alerta de éxito
          const alert = await this.alertController.create({
            header: 'Comentario Enviado',
            message: 'Gracias por tu comentario.',
            buttons: ['OK']
          });
          await alert.present();

        },
        async error => {
          // Manejo de error
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Hubo un problema al enviar tu comentario. Inténtalo de nuevo.',
            buttons: ['OK']
          });
          await alert.present();
        }
      );
    }
}
