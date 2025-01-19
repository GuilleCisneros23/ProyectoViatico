import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViaticoService } from '../viatico.service'; // Servicio para obtener los viáticos
import { PopupComponent } from '../popup/popup.component'; // Componente para mostrar un popup
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

// Interfaz que define la estructura de un viático
interface Viatico {
  identificacion: string;
  agente: string;
  fecha_registro: string;
  cliente: string;
  correoAprobador: string;
  motivo: string;
  fechaInicio: string;
  fechaFin: string;
  numeroArchivos: number;
}

@Component({
  selector: 'app-busqueda',

  //Importación de módulos
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginator,
    PopupComponent,
  ],
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
  standalone: true,
})

export class BusquedaComponent implements AfterViewInit {

  identificacion: string = ''; // Valor de búsqueda por identificación
  viaticos: Viatico[] = []; // Arreglo de viáticos que se obtienen
  archivosT: number = 0; // Total de archivos cargados
  showPopup: boolean = false; // Bandera para mostrar el popup
  popupMessage: string = ''; // Mensaje que se muestra en el popup

  // Columnas de la tabla
  displayedColumns: string[] = [
    'identificacion',
    'agente',
    'fecha_registro',
    'cliente',
    'correoAprobador',
    'motivo',
    'fechaInicio',
    'fechaFin',
  ];


  dataSource = new MatTableDataSource<Viatico>(); // Fuente de datos para la tabla
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Paginador de la tabla
  constructor(private viaticoService: ViaticoService) {} // Inyectamos el servicio para obtener viáticos


  // Método que se ejecuta después de la vista inicial del componente
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Asignamos el paginador a la fuente de datos
  }


  // Método para realizar la búsqueda de viáticos por identificación
  search(): void {
    if (!this.identificacion.trim()) { //Identificación inválida
      alert('Por favor, ingrese una identificación válida...');
      this.viaticos = [];
      return;
    }

    // Llamamos al servicio que comunica con el back end
    this.viaticoService.getViaticosPorIdentificacion(this.identificacion).subscribe(
      (response) => {
        if (response && response.length > 0) { //Verificación de la existencia de viáticos
          console.log('Datos recibidos del backend: ', response);
          this.viaticos = response;

          // Ordenamiento de viáticos por fecha de registro más reciente
          this.viaticos = this.viaticos.sort((a, b) => {
            return new Date(b.fecha_registro).getTime() - new Date(a.fecha_registro).getTime();
          });

          //Total de archivos cargados
          this.archivosT = this.viaticos.reduce(
            (total, viatico) => total + viatico.numeroArchivos,
            0
          );

          // Asignación de los 10 primeros viáticos a la tabla
          this.dataSource.data = this.viaticos.slice(0, 10);

          //Popup con el total de archivos
          this.popupMessage = `El número total de archivos cargados por este agente es: ${this.archivosT}`;
          this.showPopup = true;
        } else {
          this.viaticos = [];
          alert('No se encontraron viáticos para la identificación proporcionada.');
        }
      },
      (error) => {
        console.error('Error al buscar viáticos:', error);
        this.viaticos = [];
        alert('Ocurrió un error al realizar la búsqueda, inténtelo nuevamente...');
      }
    );
  }


  // Método para mostrar detalles de un viático
  detallesArchivos(viatico: Viatico): void {
    this.popupMessage = ` El agente ${viatico.agente} con la ID: ${viatico.identificacion}
       registro este viático en ${viatico.fecha_registro}, el número de facturas cargadas es: ${viatico.numeroArchivos}`;
    this.showPopup = true;
  }


  // Método para cerrar el popup de detalles
  closeDeatllesArchivos(): void {
    this.showPopup = false;
  }


  // Método para manejar el cambio de página en la tabla
  onPaginateChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize; // Índice inicial de la página
    const endIndex = startIndex + event.pageSize; // Índice final de la página
    this.dataSource.data = this.viaticos.slice(startIndex, endIndex); // Actualización de la tabla
  }

  
  // Método para reiniciar la busqueda del viático
  reset(): void {
    this.identificacion = ''; // ID reseteada
    this.viaticos = []; // Lista vacia
    this.archivosT = 0; // Total de archivos en 0
    this.showPopup = false;
    this.dataSource.data = []; // Limpieza de la tabla
  }
}
