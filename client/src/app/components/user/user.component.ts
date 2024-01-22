import { Component, OnInit } from '@angular/core';
import { Activities } from 'src/app/interfaces/actividades';
import {GamesService} from '../../services/games.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuarios } from 'src/app/interfaces/usuarios';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  user: any = [];

  usuarios: Usuarios= {
    idUsuario: undefined,
    nombre : '',
    correo: '',
    contrasena : '' ,
    telefono : '',
    nombreRol  : ''
  }

  constructor(private gameService: GamesService, private authService: AuthService){}
  ngOnInit(): void {
    var datos:any =this.authService.getCurrentUser();
    this.usuarios = datos[0];
    console.log(this.usuarios);
  }

  editUser(id:string){
    console.log(id);
  }
}
