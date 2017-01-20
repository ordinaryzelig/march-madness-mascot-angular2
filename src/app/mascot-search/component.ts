import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mascot-search',
  templateUrl: './component.html',
})

export class MascotSearchComponent {
  @Output() search = new EventEmitter();

  onTermChange(term) {
    this.search.emit(term)
  }
}
