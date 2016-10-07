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

  constructor(
    private mascotService: MascotService,
    private entryService: EntryService,
  ) {}

  ngOnInit(): void {
    this.initYears();
    this.changeYear(this.years[this.years.length - 1]);
    this.initTagDropdown();
    this.entry.selectableMascots().forEach(mascot => mascot.selected = true);
  }

  changeYear(year): void {
    this.selectedYear = year;
    this.initEntry();
  }

  tags(): Tag[] {
    return this.entry.tags;
  }

  selectedMascots(): Mascot[] {
    return this.entry.selectedMascots();
  }

  selectMascot(mascot): void {
    this.entry.select(mascot);
  }

  unselectMascot(mascot): void {
    this.entry.unselect(mascot);
  }

  selectableMascots(): Mascot[] {
    return this.entry.selectableMascots().filter(
      mascot => this.searchTerm ? mascot.matches(this.searchTerm) : true
    );
  }

  search(term): void {
    this.searchTerm = term;
  }

  entryIsComplete(): boolean {
    return this.entry.isComplete();
  }

  submitPicks(): void {
    this.entryService.submit(this.entry)
    .subscribe(
      result => this.picksSubmittedSuccessfully = result,
      error => this.failedSubmittingPicks(error),
    );
  }

  //////////
  // PRIVATE

  private initYears(): void {
    this.years = this.mascotService.eligibleYears();
  }

  private initEntry(): void {
    this.entry = this.mascotService.entryForYear(this.selectedYear);
  }

  private initTagDropdown(): void{
    jQuery(document).ready(function() {
      jQuery('.tags .dropdown .dropdown-toggle')
        .dropdown()
        // Prevent menu from closing when clicking.
        .parent().find('.dropdown-menu')
        .on('click', e => e.stopPropagation());
    })
  }

  private failedSubmittingPicks(error: any) {
    console.log(error);
  }
}
