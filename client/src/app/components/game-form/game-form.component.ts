import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Activities } from 'src/app/interfaces/actividades';
import {GamesService} from '../../services/games.service';
import { Usuarios } from 'src/app/interfaces/usuarios'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

declare var paypal: { Buttons: (arg0: { createOrder: (data: any, actions: { order: { create: (arg0: { purchase_units: { description: string; amount: { currency_code: string; value: number; }; }[]; }) => any; }; }) => any; onApprove: (data: any, actions: { order: { capture: () => any; }; }) => Promise<void>; onError: (err: any) => void; }) => { (): any; new(): any; render: { (arg0: any): void; new(): any; }; }; };

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit{

  inputValue: number = 0.0

  mostrarValor() {
    console.log('Valor del input:', this.inputValue)
  }

  @ViewChild('paypal', {static: true}) paypalElement : ElementRef | any;

  servicio = {
    descripcion: 'pago',
    precio: this.inputValue
  }
  title = 'angular-paypal-payment'

  act: any = [];
  usuarios: Usuarios= {
    idUsuario: undefined,
    nombre : '',
    correo: '',
    contrasena : '' ,
    telefono : undefined,
    nombreRol  : ''
  }
 
  constructor(private gameService: GamesService, private authService: AuthService,private router: Router){}
  ngOnInit(): void {

    paypal
    .Buttons({
      createOrder: (data: any, actions: { order: { create: (arg0: { purchase_units: { description: string; amount: { currency_code: string; value: number; }; }[]; }) => any; }; }) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.servicio.descripcion,
              amount: {
                currency_code: 'MXN',
                value: this.inputValue,
              }
            }
          ]
        })
      },
      onApprove: async (data: any, actions: { order: { capture: () => any; }; }) => {
        const order = await actions.order.capture();
        console.log(order);
      },
      onError: (err: any) =>{
        console.log(err);
      }
    })
    .render(this.paypalElement.nativeElement);
  

    var datos: any = this.authService.getCurrentUser();
  this.usuarios = datos[0];
  console.log(this.usuarios.idUsuario);

  if (this.usuarios.idUsuario !== undefined && this.usuarios.idUsuario !== null ) {
    this.getAct(this.usuarios.idUsuario);
  } else {
    console.error('El idUsuario es undefined');
    this.router.navigate(['/home']);
  }
  }

 getAct(idUsuario: number) {
  this.gameService.getact(idUsuario).subscribe(
    res => {
      console.log(res);
      this.act = res;
    },
    error => {
      console.error(error);
      this.router.navigate(['/home']); // Redirige a la ruta /home en caso de error
    }
  );
}

cancelar(id: string ) {
  if (this.usuarios.idUsuario !== undefined) {
    this.gameService.deleteact(id)
      .subscribe(
        res => {
          console.log(res);
          this.getAct(this.usuarios.idUsuario!); // Use non-null assertion
          alert("Actividad Cancelada");
        },
        error => {
          console.error(error);
          this.router.navigate(['/home']); // Redirige a la ruta /home en caso de error
        } 
      );
  } else {
    console.error('idUsuario is undefined');
  }
}



editact(id:string){
  console.log(id);
}
  
}
