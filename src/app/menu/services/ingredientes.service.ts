import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IIngredientes } from '../models';

@Injectable({
    providedIn: 'root'
  })
  export class IngredientesHttpService {
    private apiUrl: string;
  
    constructor(private http: HttpClient) {
      this.apiUrl = environment.apiUrl;
    }
    
    getAll(): Observable<IIngredientes[]> {
      return this.http.get<IIngredientes[]>(`${this.apiUrl}/ingredientes`);
    }
  
    getById(id: number): Observable<IIngredientes> {
      return this.http.get<IIngredientes>(`${this.apiUrl}/ingredientes/${id}`);
    }
  
    add(ingredientes: IIngredientes): Observable<IIngredientes> {
      return this.http.post<IIngredientes>(`${this.apiUrl}/ingredientes`, ingredientes);
    }

    update(id: number, ingredientes: IIngredientes): Observable<IIngredientes> {
      return this.http.put<IIngredientes>(`${this.apiUrl}/ingredientes/${id}`, ingredientes);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/ingredientes/${id}`);
    }
  }
  
