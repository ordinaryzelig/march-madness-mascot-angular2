import { Component, OnInit } from '@angular/core';

import { Mascot }        from './mascot';
import { Tag }           from './tag';
import { MascotService } from './mascot.service.ts';
import { EntryService }  from './entry.service.ts';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [
    MascotService,
    EntryService,
  ],
})

export class AppComponent implements OnInit {
  entry = null;
  years = [];
  selectedYear = null;
  mascotImagePath = 'assets/images/mascots/';
  searchTerm = null;
  picksSubmittedSuccessfully = null;
  mascotSelected: boolean;

  constructor(
    private mascotService: MascotService,
    private entryService: EntryService,
  ) {}

  ngOnInit() {
    this.initYears();
    this.changeYear(this.years[this.years.length - 1]);
    this.initTagDropdown();
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

  unselectMascot(mascot) {
    this.entry.unselect(mascot);
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

  submitPicks() {
    this.entryService.submit(this.entry)
    .subscribe(
      result => this.picksSubmittedSuccessfully = result,
      error => this.failedSubmittingPicks(error),
    );
  }

  selectRestRandomly() {
    this.entry.selectableMascots().forEach(mascot => this.selectMascot(mascot));
  }

  //////////
  // PRIVATE

  private initYears() {
    this.years = this.mascotService.eligibleYears();
  }

  private initEntry() {
    this.entry = this.mascotService.entryForYear(this.selectedYear);
  }

  private initTagDropdown() {
    jQuery(document).ready(function() {
      jQuery('.tags .dropdown .dropdown-toggle')
        .dropdown()
        // Prevent menu from closing when clicking.
        .parent().find('.dropdown-menu')
        .on('click', e => e.stopPropagation());
    })
  }

  private scrollRanks() {
    let ranksList = jQuery('#selected-mascots ol')[0];
    console.log(ranksList.scrollTop);
    console.log(ranksList.scrollHeight);
    ranksList.scrollTop = ranksList.scrollHeight + 20;
  }

  private failedSubmittingPicks(error: any) {
    console.log(error);
  }
}
