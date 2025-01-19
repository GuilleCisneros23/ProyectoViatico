import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

/*Este servicio se encarga de gestionar todas las operaciones relacionadas con los viáticos.*/
@Injectable({
  providedIn: 'root'
})
export class ViaticoService {

  // URL del back end donde se gestionan los viáticos
  private apiUrl = 'http://localhost:8080/api/viaticos';

  constructor(private http: HttpClient) {}

  //Proceso para la creación del viático en el backend
  //crearViatico(viatico: any): Observable<any> {
    //console.log("JSON enviado desde Angular: ", viatico);
    //return this.http.post(`${this.apiUrl}/crear`, viatico);
  //}

  /*Metodo para obtener la lista completa de viáticos (busqueda general y en desuso)*/
  getViaticos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listar`);
  }

  /*Busqueda de todos los viáticos asignados a un número de identificación*/
  getViaticosPorIdentificacion(identificacion: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/busqueda/${identificacion}`);
  }

}
