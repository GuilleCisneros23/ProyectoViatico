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

@Component({
  selector: 'app-busqueda',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
  standalone: true,
})
export class BusquedaComponent {
  identificacion: string = '';
  viaticos: any[] = [];
  displayedColumns: string[] = [
    'identificacion',
    'agente',
    'fecha_registro',
    'cliente',
    'correoAprobador',
    'motivo',
    'fechaInicio',
    'fechaFin',
    'numeroArchivos',
  ];

  constructor(private viaticoService: ViaticoService) {}

  search(): void {
    if (!this.identificacion.trim()) {
      alert('Por favor, ingrese una identificación válida...');
      return;
    }

    this.viaticoService.getViaticosPorIdentificacion(this.identificacion).subscribe(
      (response) => {
        console.log('Datos recibidos del backend: ', response);
        this.viaticos = response;
      },
      (error) => {
        console.error('Error al buscar viáticos:', error);
        alert('Ocurrió un error al realizar la búsqueda, inténtelo nuevamente...');
      }
    );
  }
}
