import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IMenu, IMenuPlato } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MenuHttpService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getAll(): Observable<IMenu[]> {
    return this.http.get<IMenu[]>(`${this.apiUrl}/menu`);
  }

  getById(id: number): Observable<IMenu> {
    return this.http.get<IMenu>(`${this.apiUrl}/menu/${id}`);
  }

  add(menu: IMenu): Observable<IMenu> {
    return this.http.post<IMenu>(`${this.apiUrl}/menu`, menu);
  }

  update(id: number, menu: IMenu): Observable<IMenu> {
    return this.http.put<IMenu>(`${this.apiUrl}/menu/${id}`, menu);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/menu/${id}`);
  }

  getMenuPlato(): Observable<IMenuPlato[]> {
    return this.http.get<IMenuPlato[]>(`${this.apiUrl}/menu-plato`);
  }
}
