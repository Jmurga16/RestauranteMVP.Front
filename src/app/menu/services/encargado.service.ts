import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IEncargado } from '../models';

@Injectable({
    providedIn: 'root'
  })
  export class EncargadoHttpService {
    private apiUrl: string;
  
    constructor(private http: HttpClient) {
      this.apiUrl = environment.apiUrl;
    }
    
    getAll(): Observable<IEncargado[]> {
      return this.http.get<IEncargado[]>(`${this.apiUrl}/encargado`);
    }
  
    getById(id: number): Observable<IEncargado> {
      return this.http.get<IEncargado>(`${this.apiUrl}/encargado/${id}`);
    }
  
    add(encargado: IEncargado): Observable<IEncargado> {
      return this.http.post<IEncargado>(`${this.apiUrl}/encargado`, encargado);
    }

    update(id: number, encargado: IEncargado): Observable<IEncargado> {
      return this.http.put<IEncargado>(`${this.apiUrl}/encargado/${id}`, encargado);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/encargado/${id}`);
    }

    getEncargadoCategorias(): Observable<IEncargado[]> {
      return this.http.get<IEncargado[]>(`${this.apiUrl}/encargado-categorias`);
    }
  }
  
