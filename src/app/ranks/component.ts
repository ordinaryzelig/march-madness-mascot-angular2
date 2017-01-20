import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ranks',
  templateUrl: './component.html',
  styleUrls: ['./component.less'],
})

export class RanksComponent {
  @Input() entry: any;
  @Output() selectRestRandomly = new EventEmitter();

  mascots() {
    return this.entry.selectedMascots();
  }

  entryIsComplete(): boolean {
    return this.entry.isComplete();
  }

  unselectMascot(mascot) {
    this.entry.unselect(mascot);
  }

  onClickSelectRestRandomly() {
    this.selectRestRandomly.emit()
  }
}
