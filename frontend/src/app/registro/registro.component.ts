import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import JSZip from 'jszip';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: true
})
export class RegistroComponent {

  fileInfo: { fileCount: number } | null = null;

  formData: {
    fechaRegistro: string;
    agente: string;
    identificacion: string;
    motivo: string;
    cliente: string;
    fechaInit: string;
    fechaFin: string;
    correoAprobador: string;
    fileCount: number | null;
  } = {
    fechaRegistro: '',
    agente: '',
    identificacion: '',
    motivo: '',
    cliente: '',
    fechaInit: '',
    fechaFin: '',
    correoAprobador: '',
    fileCount: null
  };

  onSubmit(): void {
    const form: HTMLFormElement = document.querySelector('form')!;
    const formData = new FormData(form);

    this.formData = {
      fechaRegistro: formData.get('fechaRegistro') as string,
      agente: formData.get('agente') as string,
      identificacion: formData.get('identificacion') as string,
      motivo: formData.get('motivo') as string,
      cliente: formData.get('cliente') as string,
      fechaInit: formData.get('fechaInit') as string,
      fechaFin: formData.get('fechaFin') as string,
      correoAprobador: formData.get('correoAprobador') as string,
      fileCount: this.fileInfo?.fileCount ?? 0
    };

    console.log('Datos del formulario guardados...', this.formData);
  }

  async onFileSelected(event: Event): Promise<void> {
    this.fileInfo = await this.processFile(event);
  }

  private async processFile(event: Event): Promise<{ fileCount: number } | null> {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type === 'application/zip' || file.name.endsWith('.zip')) {
        const zip = new JSZip();

        try {
          const zipContent = await zip.loadAsync(file);
          const fileCount = Object.keys(zipContent.files).length;
          return { fileCount };
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
