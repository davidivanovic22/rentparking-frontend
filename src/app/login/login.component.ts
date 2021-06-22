import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {AuthenticationService} from 'src/assets/services/auth/authentication.service';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthenticationService, private socialAuth: SocialAuthService) {
  }

  ngOnInit(): void {
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  login(): void {
    this.authService.login(this.form.value.username.trim(), this.form.value.password);
  }

  loginWithSocial(socialPlatform: string) {
    let socialPlatformProvider: any;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuth.signIn(socialPlatformProvider).then(data => {
      console.log(data)
      this.form.get("username")?.setValue(data.email.split("@")[0]);
    });

  }
}
