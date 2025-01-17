import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViaticoService } from '../viatico.service';
import { response } from 'express';

@Component({
  selector: 'app-busqueda',
  imports: [CommonModule,FormsModule],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css',
  standalone: true
})
export class BusquedaComponent {

  identificacion: string = '';
  viaticos: any[] = [];
  constructor(private viaticoService: ViaticoService){}

  search(): void{
    if(!this.identificacion.trim()){
      alert('Por favor, ingrese una identificación validad...');
      return;
    }

    this.viaticoService.getViaticosPorIdentificacion(this.identificacion).subscribe(
      (response) => {
        console.log('Datos recibidos del backend: ',response);
        this.viaticos = response;
      },(error) => {
        console.error('Error al buscar viáticos:',error);
        alert('Ocurrio un error al realizar la busqueda, intentelo nuevamente...');
      });
  }

}
