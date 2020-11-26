import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AdvertService } from '../services/advert-service';
import { AuthService } from '../services/auth-service';
import { UserService } from '../services/user-service';
import { User } from '../user.entities';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  @ViewChild('form', { static: true }) ngForm: NgForm;
  roles: string[] = ['User', 'Organisation'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private advertService: AdvertService,
    private userService: UserService
  ) {
    this.user = {
      email: '',
      password: '',
      username: '',
      role: '',
      likedAdverts: [],
    };
  }
  errorMsg: string;
  user: User;
  formGroup: FormGroup;

  ngOnInit(): void {
    let params = this.route.snapshot.params;
    if (params.id) {
      this.getUser(params.id);
    }
  }

  private getUser(id: number): void {
    this.userService
      .getUser(id)
      .pipe(take(1))
      .subscribe((response) => {
        this.user = response;
      });
  }

  onSubmit() {
    if (!this.user.id) {
      this.authService
        .getUsers()
        .pipe(
          map((stream: User[]) =>
            stream.find((user) => user.email === this.user.email)
          ),
          take(1)
        )
        .subscribe((response) => {
          if (response) {
            this.errorMsg = 'User with this email already exists';
            debugger;
            return;
          }

          this.authService
            .register(this.user)
            .pipe(take(1))
            .subscribe(() => this.router.navigate(['login']));
        });
    } else {
      this.userService.updateUser(this.user).pipe(take(1)).subscribe();
      this.router.navigate(['/']);
    }
  }

  onDelete() {
    this.userService.deleteUser(this.user.id).subscribe();
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
