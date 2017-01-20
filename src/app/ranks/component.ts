import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ranks',
  templateUrl: './component.html',
  styleUrls: ['./component.less'],
})

export class RanksComponent {
  @Input() entry: any;

  mascots() {
    return this.entry.selectedMascots();
  }

  entryIsComplete(): boolean {
    return this.entry.isComplete();
  }

  unselectMascot(mascot) {
    this.entry.unselect(mascot);
  }
}
