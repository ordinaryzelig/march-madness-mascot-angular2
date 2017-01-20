import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './component.html',
})

export class NavbarComponent {
  @Input() years: any;
  @Input() selectedYear: any;
  @Output() changeYear = new EventEmitter();

  onChangeYear(year) {
    this.changeYear.emit(year);
  }
}
