import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deny',
  templateUrl: './deny.component.html',
  styleUrls: ['./deny.component.css']
})
export class DenyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
