import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 @ViewChild('form', { static: true }) ngForm: NgForm;

email: string;
password: string;
errorMsg: string;
  ngOnInit(): void {
    
  }
    constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    
    this.authService
      .login(this.email, this.password)
      .pipe(take(1))
      .subscribe((response) => {
        if (!response) {
          this.errorMsg = 'Invalid username or password';

          return;
        }

        this.authService.setLoggedUser(response);
        this.router.navigate(['adverts']);
      });

}
}
