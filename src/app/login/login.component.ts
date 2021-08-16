import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  return: string = '';

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Query) => {
      this.return = params['return'] || '/forums';
      if (!this.userService.isGuest()) {
        this.go();
      }
    })
  }

  private go() {
    this.router.navigateByUrl(this.return);
  }
  login() {
    console.log('Login service');
    if (this.username && this.password) {
      this.userService.login(this.username);
      this.go();
    }
  }
}
