import { Component, OnInit } from '@angular/core';
import { ApiNodeService } from '../Servicios/api-node.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

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
  dataGame: any

  constructor(private apis:ApiNodeService, private router:Router) { }

  ngOnInit() {
    this.getCards();
    this.getPlayers();
    this.getGame();
    // this.getPenitencia()
    // this.seleccionarCartaAleatoria()
  }

  getGame(){
    this.apis.getSala(this.idGame).subscribe({
      next:(data:any)=>{
        this.dataGame = data.dataSala[0];
        // console.log(data.dataSala[0].invite_code);
      }, error:(e:any)=>{
        console.log(e);
      }
    })
  }

  // updateGame(penitencia:any){
  //   if(this.penitencia && this.penitencia.penitencia){
  //     this.apis.upadteGame(this.idGame, this.cartaSeleccionada.url, penitencia).subscribe({
  //       next:(data:any)=>{
  
  //       },error:(e:any)=>{
  //         console.log(e);
  //       }
  //     })
  //   }
    
  // }

  getCards(){
    this.apis.getCars(this.id).subscribe({
      next:(data:any)=>{
        this.listaCards = data.carta
        localStorage.setItem('typemodel', data.carta.type_game_id)
        console.log(this.listaCards);
      }
    })
  }

  iniciarJuego(){
    console.log(this.turnoActual);
    // console.log(this.penitencia.penitencia);

    this.botonPrecionado = false,
    this.seleccionarCartaAleatoria();
    this.jugar();
    // this.updateGame();
  }
  continuarJuego(puntaje:any){
    console.log(this.turnoActual);
    console.log(this.jugadorActual);
    this.updatePlayer(this.jugadorActual.id, puntaje)
    this.seleccionarCartaAleatoria();
    this.jugar();
    // this.updateGame();
  }
  seleccionarCartaAleatoria() {
    if (this.listaCards && this.listaCards.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * this.listaCards.length);
      this.cartaSeleccionada = this.listaCards[indiceAleatorio];
      console.log(this.cartaSeleccionada);
      this.listaCards.splice(indiceAleatorio, 1);
      this.getPenitencia(this.cartaSeleccionada.id)
    }else{
      this.finalGame();
    }
  }

getPenitencia(id:any){
  debugger
  this.apis.getPenitencias(id).subscribe({
    next:(data:any)=>{
      console.log(data.penitencia);
      this.penitencia = data.penitencia
      // this.updateGame(data.penitencia.penitencia)
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

finalGame(){
  this.apis.finallyGame(this.idGame).subscribe({
    next:(data:any)=>{
      this.router.navigate(['/finally'])
    },error:(e:any)=>{
      console.log(e);
    }
  })
}


}
