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
      this.aps.ObtenerGame(this.id).subscribe({
        next:(data:any)=>{
          if(data.encontrada.status === 'started'){
            this.router.navigate(['/game']);
          }
        }, error:(e:any)=>{
          console.log(e);
        }
      })
      }, 3000)
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
    this.aps.getFriends(this.amigos).subscribe({
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
    this.aps.starGame(this.id).subscribe({
      next:(data:any)=>{
        this.aps.createPlayer(this.idUser, codigo).subscribe({
          next:(data:any)=>{
            this.router.navigate(['/game'])
    
          },error:(e:any)=>{
            console.log(e);
          }
        })
      }, error:(e:any)=>{
        console.log(e);
      }
    })
    
  }
  

}
