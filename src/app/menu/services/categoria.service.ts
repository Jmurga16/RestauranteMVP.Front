import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ICategoria } from '../models';

@Injectable({
    providedIn: 'root'
  })
  export class CategoriaHttpService {
    private apiUrl: string;
  
    constructor(private http: HttpClient) {
      this.apiUrl = environment.apiUrl;
    }
    
    getAll(): Observable<ICategoria[]> {
      return this.http.get<ICategoria[]>(`${this.apiUrl}/categoria`);
    }
  
    getById(id: number): Observable<ICategoria> {
      return this.http.get<ICategoria>(`${this.apiUrl}/categoria/${id}`);
    }
  
    add(categoria: ICategoria): Observable<ICategoria> {
      return this.http.post<ICategoria>(`${this.apiUrl}/categoria`, categoria);
    }

    update(id: number, categoria: ICategoria): Observable<ICategoria> {
      return this.http.put<ICategoria>(`${this.apiUrl}/categoria/${id}`, categoria);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/categoria/${id}`);
    }
  }
  
