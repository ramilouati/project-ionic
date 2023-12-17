import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {
    // Initialization code goes here (if needed)
  }

  // Method to log in the user
  logIn(email: any, password: any) {
    this.authService
      .SignIn(email.value, password.value)
      .then(() => {
        if (this.authService.isEmailVerified) {
          // If email is verified, navigate to the dashboard
          this.router.navigate(['dashboard']);
        } else {
          // If email is not verified, show alert and return false
          window.alert('Email is not verified');
        //  return false;
        }
      })
      .catch((error) => {
        // Catch any login errors and display an alert
        window.alert(error.message);
      });
  }
}
