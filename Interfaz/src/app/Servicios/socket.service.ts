import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor() {
    this.socket = io('https://backend-drinkmaster-production.up.railway.app'); 
   }

     // Emitir el evento para iniciar un juego
  startGame(gameId: string) {
     this.socket.emit('startGame', gameId);
  }

  // Escuchar el evento de inicio de juego
  onGameStarted(callback: (data: any) => void) {
    return this.socket.on('gameStarted', callback);
  }

  // Manejar errores
  onError(callback: (data: any) => void) {
    this.socket.on('error', callback);
  }

  // Emitir un mensaje de chat
  sendMessage(message: string, gameId: string) {
   return this.socket.emit('chatMessage', { message, gameId });
  }

  // Escuchar nuevos mensajes de chat
  onMessage(callback: (message: any) => void) {
    return this.socket.on('newMessage', callback);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
