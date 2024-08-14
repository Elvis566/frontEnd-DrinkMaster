import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiNodeService } from 'src/app/Servicios/api-node.service';

@Component({
  selector: 'app-unirse',
  templateUrl: './unirse.page.html',
  styleUrls: ['./unirse.page.scss'],
})
export class UnirsePage implements OnInit {

  id: any= localStorage.getItem('idUser')
  game_id: any

  constructor(private apiS:ApiNodeService, private router:Router) { }

  ngOnInit() {
  }

  unirGame(codigo:any){
    this.apiS.createPlayer(this.id, codigo.value).subscribe({
      next:(data:any)=>{
        localStorage.setItem('idGame', data.player.game_id)
        this.router.navigate(['/sala-espera'])

      },error:(e:any)=>{
        console.log(e);
      }
    })
  }



}
