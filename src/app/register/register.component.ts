import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {AuthenticationService} from "../../assets/services/auth/authentication.service";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {UserService} from "../../assets/services/user/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    cvv: new FormControl('', Validators.required),
    bankName: new FormControl('', Validators.required),
    bankAccount: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthenticationService,
              private socialAuth: SocialAuthService,
              private userService: UserService) {
  }

  ngOnInit(): void {
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  register(): void {
    console.log(this.form.value)
    this.authService.register(this.form.value);
  }

  registerWithSocial(socialPlatform: string) {
    let socialPlatformProvider: any;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuth.signIn(socialPlatformProvider).then(data => {
      this.form.get("firstName")?.setValue(data.firstName);
      this.form.get("lastName")?.setValue(data.lastName);
      this.form.get("email")?.setValue(data.email);
      this.form.get("username")?.setValue(data.email.split("@")[0]);
    });
  }
}
