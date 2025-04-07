import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IPlato } from '../models';

@Injectable({
    providedIn: 'root'
  })
  export class PlatoHttpService {
    private apiUrl: string;
  
    constructor(private http: HttpClient) {
      this.apiUrl = environment.apiUrl;
    }
    
    getAll(): Observable<IPlato[]> {
      return this.http.get<IPlato[]>(`${this.apiUrl}/plato`);
    }
  
    getById(id: number): Observable<IPlato> {
      return this.http.get<IPlato>(`${this.apiUrl}/plato/${id}`);
    }
  
    add(plato: IPlato): Observable<IPlato> {
      return this.http.post<IPlato>(`${this.apiUrl}/plato`, plato);
    }

    update(id: number, plato: IPlato): Observable<IPlato> {
      return this.http.put<IPlato>(`${this.apiUrl}/plato/${id}`, plato);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/plato/${id}`);
    }
  }
  
