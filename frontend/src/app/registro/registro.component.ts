import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViaticoService } from '../viatico.service';
import JSZip from 'jszip';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: true
})
export class RegistroComponent {
  
  fileInfo: { numeroArchivos: number } | null = null;

  formData: {
    fecha_registro: string;
    agente: string;
    identificacion: string;
    motivo: string;
    cliente: string;
    fechaInicio: string;
    fechaFin: string;
    correoAprobador: string;
    numeroArchivos: number | null;
  } = {
    fecha_registro: '',
    agente: '',
    identificacion: '',
    motivo: '',
    cliente: '',
    fechaInicio: '',
    fechaFin: '',
    correoAprobador: '',
    numeroArchivos: null
  };

  constructor(
    private viaticoService: ViaticoService, 
    private http: HttpClient
  ) {}


  onSubmit(): void {
    const form: HTMLFormElement = document.querySelector('form')!;
    const formData = new FormData(form);
    const hoy = new Date();
    const mañana = new Date();
    const formatDate = (date: string): string => { return date; };


    // Obtención de los datos del formulario
    const fecha_registro = formatDate(formData.get('fecha_registro') as string);
    const fechaInicio = formatDate(formData.get('fechaInicio') as string);
    const fechaFin = formatDate(formData.get('fechaFin') as string);
    const agente = formData.get('agente') as string;
    const identificacion = formData.get('identificacion') as string;
    const motivo = formData.get('motivo') as string;
    const cliente = formData.get('cliente') as string;
    const correoAprobador = formData.get('correoAprobador') as string;
    const numeroArchivos = this.fileInfo?.numeroArchivos ?? 0;
  
    // Verificación de que todos los campos estén completos
    if (!identificacion || !agente || !motivo || !cliente || !fecha_registro || !fechaInicio || !fechaFin || !correoAprobador || numeroArchivos === null) {
      alert("Todos los campos deben estar completos.");
      return;
    }
  
    // Validación de la fecha de registro
    const fecha90DiasString = new Date(hoy.setDate(hoy.getDate() - 90)).toISOString().split('T')[0];
    console.log(fecha90DiasString);
    const fechaMananaString = new Date(mañana.setDate(mañana.getDate() + 1)).toISOString().split('T')[0];
    console.log(fechaMananaString);

  

    // Estructuración de los datos para su envío al backend
    this.formData = {
      fecha_registro: fecha_registro,
      agente: agente,
      identificacion: identificacion,
      motivo: motivo,
      cliente: cliente,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      correoAprobador: correoAprobador,
      numeroArchivos: numeroArchivos
    };
  
    // Envío de los datos al backend
    this.http.post('http://localhost:8080/api/viaticos/crear', this.formData)
      .subscribe(
        (response) => {
          console.log('Viático creado con éxito', response);
          alert("Viático registrado con éxito!");
        },
        (error) => {
          
          if (fechaMananaString <= fecha_registro) {
            alert("La fecha de registro no puede ser mayor a mañana...");
            console.error('Error al crear el viático, la fecha de registro no puede ser mayor a mañana...', error);
            return; 
          }
        
          if (fecha_registro < fecha90DiasString) {
            alert("La fecha de registro debe estar dentro de un rango de 90 días atrás...");
            console.error('Error al crear el viático, la fecha de registro debe estar dentro de un rango de 90 días atrás...', error);
            return;
          }
      
          if(fechaFin <= fechaInicio){
            alert("La fecha de inicio del viaje no puede ser mayor a la fecha de su finalización...");
            console.error('Error al crear el viático, la fecha de inicio del viaje no puede ser mayor a la fecha de su finalización...', error);
            return;
          }
        }
      );
  
    // Limpieza de los datos dentro del formulario
    this.formData = {
      fecha_registro: '',
      agente: '',
      identificacion: '',
      motivo: '',
      cliente: '',
      fechaInicio: '',
      fechaFin: '',
      correoAprobador: '',
      numeroArchivos: null
    };
    this.fileInfo = null;
  }
  
  


  // Proceso asincrónico para cargar el archivo ZIP
  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type === 'application/zip' || file.name.endsWith('.zip')) {
        const zip = new JSZip();

        try {
          const zipContent = await zip.loadAsync(file);
          this.fileInfo = { numeroArchivos: Object.keys(zipContent.files).length };
        } catch (error) {
          console.error('Error al procesar el archivo ZIP...', error);
          this.fileInfo = null;
        }
      } else {
        console.error('El archivo no sigue el formato zip...');
        this.fileInfo = null;
      }
    } else {
      this.fileInfo = null;
    }

  }



}