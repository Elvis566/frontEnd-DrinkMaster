import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiNodeService } from 'src/app/Servicios/api-node.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  GameType: any;
  user_id: any = localStorage.getItem('idUser')
  constructor(private apiS: ApiNodeService, private router: Router) { }

  ngOnInit() {
    this.getTypeGame()
  }

  getTypeGame(){
    this.apiS.getTypeGame().subscribe({
      next:(data:any)=> {
        this.GameType = data.gameT
      },
      error:(e:any)=> {
        console.log(e);
      }
    })
  }

  createGame(game_id:any){
    this.apiS.createGame(this.user_id, game_id).subscribe({
      next:(data:any)=> {
        localStorage.setItem('typeGame', game_id);
        localStorage.setItem('idGame', data.partida.id);
        this.router.navigate(['/sala-espera'])
      }, error:(e:any)=>{
        console.log(e);
      }
    })
  }



}
