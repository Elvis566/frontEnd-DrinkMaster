import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiNodeService {

  constructor( private httpclient:HttpClient) { }

  saveUser(apodo:any, email:any, password:any, avatar_id:any){
    // let avt  = new FormData();
    // avt.append('avatar', avatar);
    return this.httpclient.post('https://backend-drinkmaster-production.up.railway.app/user/create',{
      apodo: apodo, 
      email: email,
      password: password,
      avatar_id: avatar_id
    })
  }

  createGame(user_id:any, game_id:any){
    return this.httpclient.post('https://backend-drinkmaster-production.up.railway.app/game/create',{
      user_id:user_id,
      game_id: game_id
    })
  }

  loginUser(email:string, password:string){
    return this.httpclient.post('https://backend-drinkmaster-production.up.railway.app/user/login',{
      email: email,
      password: password
    })
  }

  getTypeGame(){
    return this.httpclient.get('https://backend-drinkmaster-production.up.railway.app/gameType/obtener')
  }

  getAvatarAll(){
    return this.httpclient.get('https://backend-drinkmaster-production.up.railway.app/avatar/obtenerAll')
  }

 

  getAvatar(id:any){
    return this.httpclient.get('https://backend-drinkmaster-production.up.railway.app/avatar/obtener/'+id)
  }

  getUserAll(id:any){
    return this.httpclient.get('https://backend-drinkmaster-production.up.railway.app/user/obtener/'+id)
  }

  getFriends(id:any){
    return this.httpclient.get('https://backend-drinkmaster-production.up.railway.app/friends/obtener/'+id)
  }

  createFriend(user_id:any, friend_id:any){
    return this.httpclient.post('https://backend-drinkmaster-production.up.railway.app/friends/create',{
      user_id:user_id,
      friend_id: friend_id
    })
  }

  createPlayer(user_id:any, codigo: any){
    return this.httpclient.post('https://backend-drinkmaster-production.up.railway.app/player/create',{
      user_id:user_id,
      codigo:codigo
  
    })
  }

  getSala(id:any){
    return this.httpclient.get('https://backend-drinkmaster-production.up.railway.app/game/obtener/'+id);
  }

  getPlayers(id:any){
    return this.httpclient.get('https://backend-drinkmaster-production.up.railway.app/player/obtener/'+id);
  }

  getCars(id:any){
    return this.httpclient.get('https://backend-drinkmaster-production.up.railway.app/card/obtener/'+id)
  }

  getPenitencias(card_id:any){
    return this.httpclient.get('https://backend-drinkmaster-production.up.railway.app/penitencia/obtener/'+card_id)

  }

  createSugerencia(descripcion:any, user_id: any){
    return this.httpclient.post('https://backend-drinkmaster-production.up.railway.app/sugerencia/create',{
      descripcion:descripcion,
      user_id: user_id
    })
  }




}
