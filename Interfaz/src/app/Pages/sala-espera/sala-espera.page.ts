import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { ApiNodeService } from 'src/app/Servicios/api-node.service';
import { SocketService } from 'src/app/Servicios/socket.service';

@Component({
  selector: 'app-sala-espera',
  templateUrl: './sala-espera.page.html',
  styleUrls: ['./sala-espera.page.scss'],
})
export class SalaEsperaPage implements OnInit {

  amigos:any;
  id: any = localStorage.getItem('idGame');
  idUser: any = localStorage.getItem('idUser');
  dataGame:any;
  jugadores:any;
  interval:any

  constructor(private aps: ApiNodeService, private router:Router, private socketS: SocketService) { }

  ngOnInit() {
    this.getSala();
    this.getJugadores();
    this.interval = setInterval(()=>{
      this.socketS.onGameStarted(this.id)
      clearInterval(this.interval);
      this.router.navigate(['/game']);
      })
    
    this.socketS.onGameStarted(this.id)
  }

  getSala(){
    this.aps.getSala(this.id).subscribe({
      next:(data:any)=>{
        this.dataGame = data.dataSala[0];
        console.log(data.dataSala[0].invite_code);
      }, error:(e:any)=>{
        console.log(e);
      }
    })
  }

  getJugadores(){
    this.aps.getPlayers(this.id).subscribe({
      next:(data:any)=>{
        this.jugadores = data.dataPlayers
      }, error:(e:any)=>{
        console.log(e);
      }
    })
  }

  getFriends(){
    this.aps.getFriends(this.id).subscribe({
      next:(data:any)=> {
        this.amigos = data.friendsData
        // this.avatar_id = data.friendsData.avatar
      },
      error:(e:any)=>{
        console.log(e);
      }
    })
  }

  createPlayer(codigo:any){
    this.socketS.startGame(this.id)
    this.aps.createPlayer(this.idUser, codigo).subscribe({
      next:(data:any)=>{
        this.router.navigate(['/game'])

      },error:(e:any)=>{
        console.log(e);
      }
    })
  }
  

}
