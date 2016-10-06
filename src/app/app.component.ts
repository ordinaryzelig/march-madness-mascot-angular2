import { Component, OnInit } from '@angular/core';

import { Mascot }        from './mascot';
import { Tag }           from './tag';
import { MascotService } from './mascot.service.ts';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [MascotService],
})

export class AppComponent implements OnInit {
  entry = null;
  mascots = [];
  tags = [];
  years = [];
  selectedYear = null;
  mascotImagePath = 'assets/images/mascots/';
  searchTerm = null;

  constructor(private mascotService: MascotService) {}

  ngOnInit(): void {
    this.initYears();
    this.changeYear(this.years[this.years.length - 1]);
    this.initTagDropdown();
  }

  changeYear(year): void {
    this.selectedYear = year;
    this.initEntry();
    this.initTags();
  }

  selectedMascots(): Mascot[] {
    return this.entry.selected;
  }

  selectMascot(mascot): void {
    this.entry.select(mascot);
  }

  unselectMascot(mascot): void {
    this.entry.unselect(mascot);
  }

  selectableMascots(): Mascot[] {
    let tagNames = this.mapTagNames(this.showableTags());
    return this.mascots.filter(
      mascot =>
        !mascot.selected
        && tagNames.indexOf(mascot.tag) >= 0
        && (this.searchTerm ? mascot.matches(this.searchTerm) : true)
    );
  }

  search(term): void {
    this.searchTerm = term;
  }

  allMascotsSelected(): boolean {
    return this.selectedMascots().length == this.mascots.length;
  }

  submitPicks(): void {
    //picksService.submit(this.selectedMascots);
  }

  //////////
  // PRIVATE

  private initYears(): void {
    this.years = this.mascotService.eligibleYears();
  }

  private initEntry(): void {
    this.entry = this.mascotService.entryForYear(this.selectedYear);
    this.mascots = this.entry.mascots;
  }

  private initTags(): void {
    this.tags = [];
    let tagNames = new Set([]);
    for (let mascot of this.mascots) { tagNames.add(mascot.tag); }

    tagNames.forEach(tagName => {
      this.tags.push(new Tag(tagName));
    });

    this.tags.sort((a, b) => {
      if (a.name < b.name) { return -1 };
      if (a.name > b.name) { return 1 };
      return 0;
    } );
  }

  private showableTags(): Tag[] {
    let selectedTags = this.tags.filter(t => t.selected);
    return selectedTags.length > 0 ? selectedTags : this.tags;
  }

  private mapTagNames(tags): string[] {
    let tagNames = [];
    for (let tag of tags) { tagNames.push(tag.name); }
    return tagNames;
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
}
