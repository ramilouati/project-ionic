import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {
    // Initialization code or logic can be added here
  }

  // Method to handle user registration/signup
  signUp(email: any, password: any) {
    // Register the user using the provided email and password
    this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        // If registration is successful, send a verification email
        this.authService.SendVerificationMail();
        // Navigate the user to the 'verify-email' page
        this.router.navigate(['verify-email']);
      })
      .catch((error) => {
        // If there's an error during registration, display an alert with the error message
        window.alert(error.message);
      });
  }
}
