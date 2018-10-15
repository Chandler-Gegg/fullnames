import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onLoginEmail(): void {
    if (this.validateForm(this.email, this.password)) {
      this.emailLogin(this.email, this.password);
    }
  }

  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      return false;
    }

    if (password.length === 0) {
      return false;
    }

    if (password.length < 6) {
      return false;
    }
    return true;
  }

  emailLogin(email: string, password: string) {
    this.loginService.loginWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/dashboard']))
        .catch( error => {
          console.log(error);
          this.router.navigate(['/login']);
        });
  }
}
