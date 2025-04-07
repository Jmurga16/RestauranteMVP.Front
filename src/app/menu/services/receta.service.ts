import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IReceta } from '../models';

@Injectable({
    providedIn: 'root'
  })
  export class RecetaHttpService {
    private apiUrl: string;
  
    constructor(private http: HttpClient) {
      this.apiUrl = environment.apiUrl;
    }
    
    getAll(): Observable<IReceta[]> {
      return this.http.get<IReceta[]>(`${this.apiUrl}/receta`);
    }
  
    getById(id: number): Observable<IReceta> {
      return this.http.get<IReceta>(`${this.apiUrl}/receta/${id}`);
    }
  
    add(receta: IReceta): Observable<IReceta> {
      return this.http.post<IReceta>(`${this.apiUrl}/receta`, receta);
    }

    update(id: number, receta: IReceta): Observable<IReceta> {
      return this.http.put<IReceta>(`${this.apiUrl}/receta/${id}`, receta);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/receta/${id}`);
    }
  }
  
