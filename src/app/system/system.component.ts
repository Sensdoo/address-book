import { Component, OnInit } from '@angular/core';
import {User} from '../entities/user.entity';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})

export class SystemComponent implements OnInit {

  user: User;

	constructor(
	  private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}

	ngOnInit() {
	  this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  logout() {
	  this.authService.logout();
	  this.router.navigate(['/login']);
  }

  back() {
	  this.location.back();
  }
}
