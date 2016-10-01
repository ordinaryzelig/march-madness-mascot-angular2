import { Component, OnInit } from '@angular/core';
import { MASCOT_DATA } from './mascot-data';
import { Mascot } from './mascot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  mascots = [];
  title = 'app works!';
  selectedYear = '2015';
  mascotImagePath = 'assets/images/mascots/';

  ngOnInit(): void {
    for (let atts of MASCOT_DATA[this.selectedYear]) {
      this.mascots.push(new Mascot(atts));
    }
  }
}
