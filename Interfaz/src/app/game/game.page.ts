import { Component, OnInit } from '@angular/core';
import { ApiNodeService } from '../Servicios/api-node.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  id: any = localStorage.getItem('idGame');
  listaCards:any

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

}
