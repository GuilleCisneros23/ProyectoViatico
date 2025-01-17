import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RegistroComponent,BusquedaComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Valhalla Airways';
  showForm = true;
  showBusqueda = false;

  toggleSection() {
    this.showForm = true;
    this.showBusqueda = false;
  }

  toggleBusqueda(){
    this.showForm = false;
    this.showBusqueda = true;
  }

}
