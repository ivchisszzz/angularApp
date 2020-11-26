import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth-service';
import { User } from '../user.entities';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

 hasLoggedIn: boolean;

  user: User;
destroy$ = new Subject<boolean>();
  constructor(private router: Router,
    private authService: AuthService) { }



   ngOnInit(): void {
    this.authService
      .getHasLoggedIn()
      .pipe(takeUntil(this.destroy$))
      .subscribe((hasLogged) => {
        this.hasLoggedIn = hasLogged;
        this.user = this.authService.getLoggedUser();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
