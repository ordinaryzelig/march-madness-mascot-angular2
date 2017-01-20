import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mascots-selectable',
  templateUrl: './component.html',
  styleUrls: ['./component.less'],
})

export class MascotsSelectableComponent {
  @Input() mascots: any;
  @Output() selectMascot = new EventEmitter();

  onSelectMascot(mascot) {
    this.selectMascot.emit(mascot)
  }
}
