import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Advert } from '../advert.entities';
import { AuthService } from '../services/auth-service';
import { User } from '../user.entities';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css'],
})
export class AdvertComponent implements OnInit {
  @Input() advert: Advert;
  @Input() loggedUser: User;
  @Output() advertDeleted = new EventEmitter<number>();
  @Output() advertLiked = new EventEmitter<Advert>();

  hasLoggedIn: boolean;
  user: User;
  destroy$ = new Subject<boolean>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .getHasLoggedIn()
      .pipe(takeUntil(this.destroy$))
      .subscribe((hasLogged) => {
        this.hasLoggedIn = hasLogged;
        this.user = this.authService.getLoggedUser();

        this.loggedUser = this.authService.getLoggedUser();
      });
  }
}
