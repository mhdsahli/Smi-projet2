import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  lat = 47.663860;
  lng = 6.851200;
  public origin: any;
  public destination: any;
  constructor() {

  }

  ngOnInit() {
    this.getDirection();

  }
  getDirection() {
    this.origin = { lat: 24.799448, lng: 120.979021 };
    this.destination = { lat: 24.799524, lng: 120.975017 };

    // this.origin = 'Taipei Main Station';
    // this.destination = 'Taiwan Presidential Office';
  }

}
