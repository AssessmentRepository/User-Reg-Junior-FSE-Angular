import { Component } from '@angular/core';
import { AuthenticationService } from './_services';
import { User } from './_models';
import { Router } from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spring-mvc';
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === "Admin";
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  adminpage() {
    this.router.navigateByUrl("admin");
  }
  signinpage() {
    this.router.navigateByUrl("login");
  }

  registerpage() {
    this.router.navigateByUrl("register");
  }


}
