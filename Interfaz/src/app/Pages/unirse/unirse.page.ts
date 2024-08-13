import { Component, OnInit } from '@angular/core';
import { ApiNodeService } from 'src/app/Servicios/api-node.service';

@Component({
  selector: 'app-unirse',
  templateUrl: './unirse.page.html',
  styleUrls: ['./unirse.page.scss'],
})
export class UnirsePage implements OnInit {

  id: any= localStorage.getItem('idUser')

  constructor(private apiS:ApiNodeService) { }

  ngOnInit() {
  }

  unirGame(codigo:any){
    this.apiS.createPlayer(this.id, codigo.value).subscribe({
      next:(data:any)=>{

      },error:(e:any)=>{
        console.log(e);
      }
    })
  }

}
