import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';

  mascots = [
    {name: 'Akron Zips',           imageSrc: 'assets/images/mascots/akron_zips.png'},
    {name: 'alabama crimson tide', imageSrc: 'assets/images/mascots/alabama_crimson_tide.png'},
  ]
}
