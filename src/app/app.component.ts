import { Component, OnInit } from '@angular/core';

import { Mascot }        from './mascot';
import { Tag }           from './tag';
import { MascotService } from './mascot.service';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './layout.less',
    './app.component.less',
  ],
  providers: [
    MascotService,
  ],
})

export class AppComponent implements OnInit {
  entry = null;
  years = [];
  selectedYear = null;
  searchTerm = null;
  mascotSelected: boolean;

  constructor(
    private mascotService: MascotService,
  ) {}

  ngOnInit() {
    this.initYears();
    this.changeYear(this.years[this.years.length - 1]);
  }

  ngAfterViewChecked() {
    if(this.mascotSelected) {
      this.scrollRanks();
      this.mascotSelected = false;
    }
  }

  changeYear(year) {
    this.selectedYear = year;
    this.initEntry();
  }

  tags(): Tag[] {
    return this.entry.tags;
  }

  selectedMascots(): Mascot[] {
    return this.entry.selectedMascots();
  }

  selectMascot(mascot) {
    this.entry.select(mascot);
    this.mascotSelected = true;
  }

  selectableMascots(): Mascot[] {
    return this.entry.selectableMascots().filter(
      mascot => this.searchTerm ? mascot.matches(this.searchTerm) : true
    );
  }

  search(term) {
    this.searchTerm = term;
  }

  entryIsComplete(): boolean {
    return this.entry.isComplete();
  }

  selectRestRandomly() {
    this.entry.selectableMascots().forEach(mascot => this.selectMascot(mascot));
  }

  showSubmissionForm(): boolean {
    return this.entry.isComplete();
  }

  //////////
  // PRIVATE

  private initYears() {
    this.years = this.mascotService.eligibleYears();
  }

  private initEntry() {
    this.entry = this.mascotService.entryForYear(this.selectedYear);
  }

  private scrollRanks() {
    let ranksList = jQuery('#selected-mascots ol')[0];
    ranksList.scrollTop = ranksList.scrollHeight + 20;
  }
}
