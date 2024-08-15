import { Component, OnInit } from '@angular/core';
import { ApiNodeService } from '../Servicios/api-node.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  id: any = localStorage.getItem('typeGame');
  listaCards:any
  cartaSeleccionada: any
  penitencia:any

  constructor(private apis:ApiNodeService) { }

  ngOnInit() {
    this.getCards();
  }

  getCards(){
    this.apis.getCars(this.id).subscribe({
      next:(data:any)=>{
        this.listaCards = data.carta
      }
    })
  }

  seleccionarCartaAleatoria() {
    if (this.listaCards && this.listaCards.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * this.listaCards.length);
      this.cartaSeleccionada = this.listaCards[indiceAleatorio];
    }
  }

  getPenitencia(){
    if(this.cartaSeleccionada){
      this.apis.getPenitencias(this.cartaSeleccionada.id).subscribe({
        next:(data:any)=>{
          this.penitencia = data.penitencia
        },error:(e:any)=>{
          console.log(e);
        }
      })
    }


  }



}
