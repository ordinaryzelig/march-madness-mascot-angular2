import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mascot-image',
  templateUrl: './component.html',
  styleUrls: ['./component.less'],
})

export class MascotImageComponent {
  @Input() mascot: any;
  mascotImagePath = 'assets/images/mascots/';
}
