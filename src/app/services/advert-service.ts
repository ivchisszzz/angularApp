import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Advert } from '../advert.entities';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class AdvertService {
  url = 'http://localhost:3000/adverts';

  constructor(private http: HttpClient, private authService: AuthService) {}

  listAdverts(): Observable<Advert[]> {
    return this.http.get<Advert[]>(this.url);
  }

  getAdvert(id: number): Observable<Advert> {
    const url = `${this.url}/${id}`;

    return this.http.get<Advert>(url);
  }

  createAdvert(advert: Advert): Observable<any> {
    advert.createdBy = this.authService.getLoggedUser().id;
    return this.http.post(this.url, advert);
  }

  updateAdvert(advert: Advert): Observable<any> {
    const url = `${this.url}/${advert.id}`;
    return this.http.put(url, advert);
  }

  deleteAdvert(id: number): Observable<any> {
    const url = `${this.url}/${id}`;

    return this.http.delete(url);
  }
}
