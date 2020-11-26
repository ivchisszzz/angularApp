import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Advert } from '../advert.entities';
import { User } from '../user.entities';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/users';

  private hasLoggedIn$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  login(email: string, password: string): Observable<User> {
    return this.getUsers().pipe(
      map((stream: User[]) =>
        stream.find(
          (user) => user.email === email && user.password === password
        )
      )
    );
  }
  register(data: User): Observable<User> {
    return this.http.post<User>(this.url, data);
  }
  setLoggedUser(user: User): void {
    localStorage.setItem('loggedUser', JSON.stringify(user));

    this.setHasLoggedIn(true);
  }

  setHasLoggedIn(hasLogged: boolean): void {
    this.hasLoggedIn$.next(hasLogged);
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem('loggedUser'));
  }

  getHasLoggedIn(): Observable<boolean> {
    return this.hasLoggedIn$.asObservable();
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    localStorage.clear();

    this.setHasLoggedIn(false);
  }
}
