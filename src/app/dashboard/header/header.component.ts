import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  public username = localStorage.getItem('username');

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }


  logout() {
    if (localStorage.getItem('username')) {
      localStorage.clear();
      this.router.navigate(['login']);
    }
  }

}
