import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage {

  feedbackForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private http: HttpClient
  ) {
    this.feedbackForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      comentario: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  async enviarComentario() {
    if (this.feedbackForm.valid) {
      const { nombre, email, comentario } = this.feedbackForm.value;

      // Enviar los datos al backend
      this.http.post('https://tu-backend.com/api/comentarios', {
        nombre,
        email,
        comentario
      }).subscribe(
        async response => {
          // Mostrar alerta de éxito
          const alert = await this.alertController.create({
            header: 'Comentario Enviado',
            message: 'Gracias por tu comentario.',
            buttons: ['OK']
          });
          await alert.present();

          // Limpiar el formulario después de enviar
          this.feedbackForm.reset();
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
}
