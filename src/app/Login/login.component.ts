import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Users from './../users';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showLogin = false;

  constructor(
    private authService: SocialAuthService,
    private aRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });

    if (localStorage.getItem('username')) {
      this.router.navigate(['dashboard']);
    }

  }

  onLoginSubmit(loginValue) {
    if (Users.findIndex(user => JSON.stringify(user) === JSON.stringify(loginValue)) > -1) {
      this.router.navigate(['dashboard']);
      localStorage.setItem('username', loginValue.username)
      localStorage.setItem('password', loginValue.password)
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
