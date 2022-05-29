import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  constructor(private http: HttpClient) {}

  fetch(id: any) {
    return this.http.get(`/api/position/${id}`);
  }
  create(position: any) {
    return this.http.post(`/api/position`, position);
  }
  udate(position: any) {
    return this.http.patch(`/api/position/${position._id}`, position);
  }
  delete(position: any) {
    return this.http.delete(`/api/position/${position._id}`);
  }
}
