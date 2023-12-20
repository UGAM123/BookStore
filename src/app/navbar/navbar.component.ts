import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  totalPrice: number = 0;
  menuIsOpen: boolean = false;

  openMenu() {
    this.menuIsOpen = !this.menuIsOpen;
  }
  ngOnInit(): void {
    console.log('Hello');
  }
}
