import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  constructor(private authServ: AuthService, private rouetr: Router) {}

  ngOnInit(): void {}
  logout() {
    this.authServ.logout();
    this.rouetr.navigate(['login']);
  }
}
