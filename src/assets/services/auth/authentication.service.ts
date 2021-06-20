import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {UserService} from "../user/user.service";
import {User} from "../../../@types/entity/User";

// export interface IUserToken {
//   username?: string;
//   roles?: string[];
// }


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private userToken: any;
  private token: any;

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer xxx',
  });

  constructor(private http: HttpClient, private router: Router, private socialAuth: SocialAuthService, private userService: UserService) {
    try {
      this.token = sessionStorage.getItem('userToken');
      this.userToken = jwt_decode(this.token);
    } catch (e) {
      console.error(e);
      console.error('Not logged in.');
    }
  }


  login(username: string, password: string): void {
    this.http.post(`${environment.baseUrl}/login`, {username, password}, {
      responseType: 'text'
      , headers: this.httpHeaders
    }).subscribe(token => {
      console.log(token)
      if (token) {
        this.userToken = jwt_decode(token);
        this.token = token;
        sessionStorage.setItem('userToken', token);
        this.router.navigate(['home']);
      }
    });
  }

  loginWithSocial(socialPlatform: string) {
    let socialPlatformProvider: any;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuth.signIn(socialPlatformProvider).then(data => {
      this.userService.saveSocialUser(data).subscribe(res => {
       this.login(res.username, res.username + "123" ? res.username + "123" : "");
      });
    });
  }

  logout(): void {
    this.userToken = undefined;
    this.token = '';
    sessionStorage.removeItem('userToken');
    this.router.navigate(['']);
  }

  logOut(): void {
    this.socialAuth.signOut();
  }

  get userRoles(): string[] {
    return this.userToken.roles;
  }

  get userJwtToken(): string {
    return this.token;
  }

  get isLoggedIn(): boolean {
    return !!this.userJwtToken;
  }

  isAdmin(): boolean {
    return this.userRoles.includes('ROLE_ADMIN');
  }

  isDeveloper(): boolean {
    return this.userRoles.includes('ROLE_DEVELOPER');
  }
}
