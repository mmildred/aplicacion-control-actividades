import { Component, OnInit,HostBinding, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Activities } from 'src/app/interfaces/actividades';
import {GamesService} from '../../services/games.service';
import { Draggable, icon,Map,marker,tileLayer, latLng, routing } from 'leaflet';
import 'leaflet-routing-machine'
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-add-act',
  templateUrl: './add-act.component.html',
  styleUrls: ['./add-act.component.css'],
  
})
export class AddActComponent implements OnInit {
    Enc: any = [];
    Par: any = [];
    Est: any = [];

    
  constructor(private gameService: GamesService, private router: Router, private activateRouter : ActivatedRoute, private placeSvc:PlacesService){}
  ngOnInit(): void {

    this.contador=0;

    setTimeout(() => {
      if (this.ubicacion == null) {
        this.geo = this.placeSvc.useLocation;      
        localStorage.setItem('geolocalizar',JSON.stringify(this.geo));
      }else{
        localStorage.removeItem('geolocalizar');
        this.ubicacion = localStorage.getItem('geolozalizar');
      }     
    },2000);

    this.gameService.geEn().subscribe(
      res => {
        console.log(res),
        this.Enc = res
      },
      rep => console.error
      );

      this.gameService.gePar().subscribe(
        res => {
          console.log(res),
          this.Par = res
        },
        rep => console.error
        );
        this.gameService.geEst().subscribe(
          res => {
            console.log(res),
            this.Est = res
          },
          rep => console.error
          );

          this.activateRouter.snapshot.params;
          if (this.activateRouter.snapshot.params['id']){
            this.gameService.getacti(this.activateRouter.snapshot.params['id'])
            .subscribe(
              res => {
                console.log(res)
                console.log(this.activateRouter.snapshot.params['id'])
                this.activities = res;
                this.edit = true;
              },
              err => console.error(err)
            )
          }
  }
  
  @HostBinding('class') classes = 'row';

  activities: Activities = {
    idActividad: undefined,
    Nombre_Actividad: '',
    Descripcion: '',
    Encargado: undefined,
    Participante: undefined,
    Estatus: '',
    Fecha_de_inicio: undefined,
    Fecha_de_fin: undefined,
    Lugar: ''
  };
  
  edit: boolean = false;
  savenewactividad() {
    console.log(this.activities);
    this.gameService.saveact(this.activities)
    .subscribe(
      res => {
      console.log(res);
      this.router.navigate(['/gestion']);
    },
    err => console.error(err)
    )
  }
  
  updateAct() {
    if (this.activities.idActividad !== undefined) {
      this.gameService.updateact(this.activities.idActividad, this.activities)
        .subscribe(
          res => { 
            console.log(res);
            this.router.navigate(['/gestion']);
          },
          err => console.error(err)
        );
    } else {
      console.error("idActividad is undefined");
    }
  }


  geo:any;
  map:any;
  ubicacion:any;
  contador=0;

  ngAfterViewInit(){
    setTimeout(() => {
      this.ubicacion = localStorage.getItem('geolocalizar');
      this.map = new Map('map').setView(JSON.parse(this.ubicacion), 13);

      tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
	      maxZoom: 18,
	      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);


    },2000);
  }

  ubicar(){
    setTimeout(() => {
      marker(this.geo).addTo(this.map).bindPopup("<strong>Esta es tu ubicación</strong>").openPopup();
    }, 2000);
    

    routing.control({
      waypoints: [
        latLng(this.geo),
        latLng([21.168709834371708, -100.93142807890231])          
      ]
    }).addTo(this.map);
   }

   recargar(){
    location.reload();
   }
  
}
