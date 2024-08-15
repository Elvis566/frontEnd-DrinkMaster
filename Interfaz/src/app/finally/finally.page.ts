import { Component, OnInit } from '@angular/core';
import { ApiNodeService } from '../Servicios/api-node.service';

@Component({
  selector: 'app-finally',
  templateUrl: './finally.page.html',
  styleUrls: ['./finally.page.scss'],
})
export class FinallyPage implements OnInit {
  idGame: any = localStorage.getItem('idGame');
  id: any = localStorage.getItem('typeGame');
  jugadores: any


  constructor(private apis:ApiNodeService) { }

  ngOnInit() {
    this.getPlayers
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
}
