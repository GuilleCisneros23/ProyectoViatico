import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  // Propiedad para recibir el mensaje desde el componente padre
  @Input() message: string = '';
  // Evento que se emite cuando se cierra el popup
  @Output() closePopup = new EventEmitter<void>();
   // El popup se muestra por defecto
  showPopup: boolean = true;

  // Método para cerrar el popup
  close() {
    this.closePopup.emit();
  }
}
