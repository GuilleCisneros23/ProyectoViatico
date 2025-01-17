import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaticoService {

  private apiUrl = 'http://localhost:8080/api/viaticos';

  constructor(private http: HttpClient) {}

  crearViatico(viatico: any): Observable<any> {
    console.log("JSON enviado desde Angular: ", viatico);
    
    return this.http.post(`${this.apiUrl}/crear`, viatico);
  }

  getViaticos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listar`);
  }

  getViaticosPorIdentificacion(identificacion: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/busqueda/${identificacion}`);
  }

}
