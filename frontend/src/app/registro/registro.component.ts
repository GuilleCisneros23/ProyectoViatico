import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import JSZip from 'jszip'; //Manejo de archivos ZIP
import { HttpClient } from '@angular/common/http'; //HttpClient para hacer peticiones HTTP al Back

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: true
})
export class RegistroComponent {
  
  // Almacenamiento de la información del  ZIP cargado
  fileInfo: { numeroArchivos: number } | null = null;

  // Propiedad que guarda los datos del formulario
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

  // Inyección de dependencias de los servicios necesarios
  constructor(
    private http: HttpClient
  ) {}

  // Método que envia el formulario al back
  onSubmit(): void {
    const form: HTMLFormElement = document.querySelector('form')!; // Selecciona el formulario en el DOM
    const formData = new FormData(form); // Obtiene los datos del formulario como FormData
    const hoy = new Date(); //Fecha actual
    const mañana = new Date(); //Fecha de mañana
    const formatDate = (date: string): string => { return date; }; //Formateo de la fecha para el back

    // Obtención de los datos del formulario
    const fecha_registro = formatDate(formData.get('fecha_registro') as string);
    const fechaInicio = formatDate(formData.get('fechaInicio') as string);
    const fechaFin = formatDate(formData.get('fechaFin') as string);
    const agente = formData.get('agente') as string;
    const identificacion = formData.get('identificacion') as string;
    const motivo = formData.get('motivo') as string;
    const cliente = formData.get('cliente') as string;
    const correoAprobador = formData.get('correoAprobador') as string;
    const numeroArchivos = this.fileInfo?.numeroArchivos ?? 0; //Número de archivos cargados en el zip



    // Verificación de que todos los campos del formulario estén completos
    if (!identificacion || !agente || !motivo || !cliente || !fecha_registro || !fechaInicio || !fechaFin || !correoAprobador || numeroArchivos === null) {
      alert("Todos los campos deben estar completos.");
      return;
    }

    //Stringificación de las fechas de mañana y de 90 dias atrás
    const fecha90DiasString = new Date(hoy.setDate(hoy.getDate() - 90)).toISOString().split('T')[0];
    const fechaMananaString = new Date(mañana.setDate(mañana.getDate() + 1)).toISOString().split('T')[0];

    // Estructuración de los datos que se enviarán al backend (JSON)
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

    //Envio POST a la ubicación del back-end
    this.http.post('http://localhost:8080/api/viaticos/crear', this.formData)
      .subscribe(
        (response) => { //En caso de respuesta
          console.log('Viático creado con éxito', response);
          alert("Viático registrado con éxito!");

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
          this.fileInfo = null; //Reinicio de la info del .zip
        },
        (error) => { //En caso de errores

          //Proceso de validación de las fechas ingresadas, no se procesa el envio en el back si no cumplen las condiciones
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
  }

  // Método asincrónico para manejar la selección de un archivo ZIP
  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) { // Verifica si se ha seleccionado un archivo
      const file = input.files[0];

      if (file.type === 'application/zip' || file.name.endsWith('.zip')) { //Confirmación de .zip
        const zip = new JSZip();

        try {
          // Intenta cargar el contenido del archivo ZIP
          const zipContent = await zip.loadAsync(file);
          this.fileInfo = { numeroArchivos: Object.keys(zipContent.files).length }; //Conteo de los archivos
        } catch (error) {
          console.error('Error al procesar el archivo ZIP...', error); //Error en el procesamiento del zip
          this.fileInfo = null;//Reseteo de info de la variable
        }
      } else {
        console.error('El archivo no sigue el formato zip...');
        this.fileInfo = null; // Si el archivo no es ZIP, resetea la información
      }
    } else {
      this.fileInfo = null;
    }
  }

}
