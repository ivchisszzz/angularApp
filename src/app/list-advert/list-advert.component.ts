import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Advert } from '../advert.entities';
import { AdvertService } from '../services/advert-service';
import { AuthService } from '../services/auth-service';
import { UserService } from '../services/user-service';
import { User } from '../user.entities';

@Component({
  selector: 'app-list-advert',
  templateUrl: './list-advert.component.html',
  styleUrls: ['./list-advert.component.css'],
})
export class ListAdvertComponent implements OnInit {
  advertsList: Advert[];
  destroy$ = new Subject<boolean>();
  hasLoggedIn: boolean;
  user: User;

  advert: Advert;
  loggedUser: any;
  constructor(
    private advertServise: AdvertService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.listAdverts();
    this.authService
      .getHasLoggedIn()
      .pipe(takeUntil(this.destroy$))
      .subscribe((hasLogged) => {
        this.hasLoggedIn = hasLogged;
        this.user = this.authService.getLoggedUser();
      });
    this.loggedUser = this.authService.getLoggedUser();
  }

  private listAdverts(): void {
    this.advertServise.listAdverts().subscribe((response) => {
      this.advertsList = response;
    });
  }

  onAdvertDelete(id: number): void {
    this.advertServise
      .deleteAdvert(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.listAdverts();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onAdvertLiked(advert: Advert) {
    advert.likesNumbers += 1;
    this.loggedUser.likedAdverts.push(advert.id);

    this.advertServise.updateAdvert(advert).subscribe();
    this.userService.updateUser(this.loggedUser).subscribe();
  }
}
