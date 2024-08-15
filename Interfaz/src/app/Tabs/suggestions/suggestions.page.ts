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

  enviarComentario(comentario:any) {

      // Enviar los datos al backend
      this.apis.createSugerencia(comentario.value, this.idUser).subscribe();
    }
}
