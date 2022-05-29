import { ICategories } from './../interfaces/interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CategiriesService {
  constructor(private http: HttpClient) {}
  fetchCategories(): Observable<ICategories[]> {
    return this.http.get<ICategories[]>('/api/category');
  }
  getById(id: string): Observable<ICategories> {
    return this.http.get<ICategories>(`/api/category/${id}`);
  }
  create(name: string, image?: File) {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);
    return this.http.post('/api/category', fd);
  }
  update(id: any, name: string, image?: File) {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);
    return this.http.patch(`/api/category/${id}`, fd);
  }
  delete(id: any) {
    return this.http.delete(`/api/category/${id}`);
  }
}
