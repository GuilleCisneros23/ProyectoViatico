import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ViaticoService } from '../viatico.service';
import { PopupComponent } from '../popup/popup.component';



@Component({
  selector: 'app-busqueda',
  imports: [CommonModule,FormsModule,MatTableModule,MatInputModule,MatButtonModule,MatCardModule,MatToolbarModule,MatIconModule,PopupComponent],
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
  standalone: true,
})



export class BusquedaComponent {

  identificacion: string = '';
  viaticos: any[] = [];
  archivosT: number = 0;
  showPopup: boolean = false;
  popupMessage: string = "";

  displayedColumns: string[] = [
    'identificacion',
    'agente',
    'fecha_registro',
    'cliente',
    'correoAprobador',
    'motivo',
    'fechaInicio',
    'fechaFin'
  ];

  constructor(private viaticoService: ViaticoService) {}

  search(): void {
    if (!this.identificacion.trim()) {
       this.popupMessage='Por favor, ingrese una identificación válida...';
       this.showPopup = true;
      return;
    }

    this.viaticoService.getViaticosPorIdentificacion(this.identificacion).subscribe(
      (response) => {
        console.log('Datos recibidos del backend: ', response);
        this.viaticos = response;

        // Sumar el total de archivos cargados por todos los viáticos
        this.archivosT = this.viaticos.reduce((total, viatico) => total + viatico.numeroArchivos, 0);
        this.popupMessage = `El número total de archivos cargados por este agente es: ${this.archivosT}`;
        this.showPopup = true;
      },
      (error) => {
        console.error('Error al buscar viáticos:', error);
        alert('Ocurrió un error al realizar la búsqueda, inténtelo nuevamente...');
      }
    );
  }

  detallesArchivos(viatico: any): void {
    this.popupMessage = `Para el viático registrado por la ID: ${viatico.identificacion} el día:  ${viatico.fecha_registro}, se han cargado ${viatico.numeroArchivos} archivos.`;
    this.showPopup = true;
  }

  closeDeatllesArchivos(): void {
    this.showPopup = false;
  }
}
