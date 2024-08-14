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

  constructor(private apiS:ApiNodeService, private router:Router) { }

  ngOnInit() {
  }

  unirGame(codigo:any){
    console.log(this.id, codigo.value);
    this.apiS.createPlayer(this.id, codigo.value).subscribe({
      next:(data:any)=>{
        this.router.navigate(['/sala-espera'])

      },error:(e:any)=>{
        console.log(e);
      }
    })
  }

}
