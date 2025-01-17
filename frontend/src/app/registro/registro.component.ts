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
    const formatDate = (date: string): string => {return date;};
    const fecha_registro = formatDate(formData.get('fecha_registro') as string);
    const fechaInicio = formatDate(formData.get('fechaInicio') as string);
    const fechaFin = formatDate(formData.get('fechaFin') as string);


    // Estructurar los datos a enviar
    this.formData = {
      fecha_registro: fecha_registro,
      agente: formData.get('agente') as string,
      identificacion: formData.get('identificacion') as string,
      motivo: formData.get('motivo') as string,
      cliente: formData.get('cliente') as string,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      correoAprobador: formData.get('correoAprobador') as string,
      numeroArchivos: this.fileInfo?.numeroArchivos ?? 0
    };

    // Enviar los datos al backend
    this.http.post('http://localhost:8080/api/viaticos/crear', this.formData)
      .subscribe(
        (response) => {
          console.log('Viático creado con éxito', response);
        },
        (error) => {
          console.error('Error al crear el viático', error);
        }
      );

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

  async onFileSelected(event: Event): Promise<void> {
    this.fileInfo = await this.processFile(event);
  }

  private async processFile(event: Event): Promise<{ numeroArchivos: number } | null> {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type === 'application/zip' || file.name.endsWith('.zip')) {
        const zip = new JSZip();

        try {
          const zipContent = await zip.loadAsync(file);
          const numeroArchivos= Object.keys(zipContent.files).length;
          return { numeroArchivos };
        } catch (error) {
          console.error('Error al procesar el archivo ZIP...', error);
          return null;
        }
      } else {
        console.error('El archivo no sigue el formato zip...');
        return null;
      }
    }

    return null;
  }
}
