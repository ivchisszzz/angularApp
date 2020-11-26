import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user.entities';

@Injectable({
  providedIn: 'root',
})
export class UserService{
url = 'http://localhost:3000/users';

constructor(private http: HttpClient){

}

getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUser(id: number): Observable<User> {
    const url = `${this.url}/${id}`;
    return this.http.get<User>(url);
  }
    updateUser(user: User): Observable<any> {
    const url = `${this.url}/${user.id}`;

    return this.http.put(url, user);
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.url}/${id}`;

    return this.http.delete(url);
  }

  getUsersById(userIds: number[]): Observable<User[]> {
    return this.getUsers().pipe(
      map((stream) => {
        return stream.filter((user) => userIds.includes(user.id));
      })
    );
  }


}