import { Component, OnInit } from '@angular/core';
import { ApiNodeService } from '../Servicios/api-node.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  id: any = localStorage.getItem('typeGame');
  idGame: any = localStorage.getItem('idGame');
  jugadores:any

  listaCards:any
  cartaSeleccionada: any
  penitencia:any
  turnoActual:number= 0
  jugadorActual:any
  botonPrecionado:boolean= true

  constructor(private apis:ApiNodeService) { }

  ngOnInit() {
    this.getCards();
    this.getPlayers();
    // this.getPenitencia()
    // this.seleccionarCartaAleatoria()
  }

  getCards(){
    this.apis.getCars(this.id).subscribe({
      next:(data:any)=>{
        this.listaCards = data.carta
        console.log(this.listaCards);
      }
    })
  }

  iniciarJuego(){
    this.botonPrecionado = false,
    this.seleccionarCartaAleatoria();
    this.jugar();
  }
  continuarJuego(puntaje:any){
    this.updatePlayer(this.jugadorActual.id, puntaje)
    this.seleccionarCartaAleatoria();
    this.jugar();
  }
  seleccionarCartaAleatoria() {
    if (this.listaCards && this.listaCards.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * this.listaCards.length);
      this.cartaSeleccionada = this.listaCards[indiceAleatorio];
      console.log(this.cartaSeleccionada);
      this.getPenitencia(this.cartaSeleccionada.id)
    }
  }

getPenitencia(id:any){
  debugger
  this.apis.getPenitencias(id).subscribe({
    next:(data:any)=>{
      this.penitencia = data.penitencia
    }, error:(e:any)=>{
      console.log(e);
    }
  })
}
updatePlayer(id:any, score: any){
  this.apis.updatePlayers(id, score).subscribe({
    next:(data:any)=>{

    },error:(e:any)=>{
      console.log(e);
    }
  })
}

getPlayers(){
  this.apis.getPlayers(this.idGame).subscribe({
    next:(data:any)=>{
      this.jugadores = data.dataPlayers
    }, error:(e:any)=>{
      console.log(e);
    }
  })
}

// Método para obtener el jugador cuyo turno es el actual
getJugadorActual(){
  return this.jugadores[this.turnoActual];
}

// Método para pasar al siguiente jugador
pasarTurno() {
  if (this.jugadores.length > 0) {
    this.turnoActual = (this.turnoActual + 1) % this.jugadores.length;
  }
}

// Método para que el jugador actual realice una jugada
jugar() {
   this.jugadorActual = this.getJugadorActual()

  // Lógica para la jugada del jugador

  this.pasarTurno(); // Pasar al siguiente jugador
}


}
