import { Component, OnInit } from '@angular/core';

import { MASCOT_DATA } from './mascot-data';
import { Mascot }      from './mascot';
import { Tag }         from './tag';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})

export class AppComponent implements OnInit {
  mascots = [];
  tags = [];
  years = [];
  selectedYear = null;
  selectedMascots = [];
  mascotImagePath = 'assets/images/mascots/';
  searchTerm = null;

  ngOnInit(): void {
    this.initYears();
    this.changeYear(this.years[this.years.length - 1]);
    this.initTagDropdown();
  }

  changeYear(year): void {
    this.selectedYear = year;
    this.initMascots();
    this.initTags();
  }

  selectMascot(mascot): void {
    this.selectedMascots.push(mascot);
    mascot.selected = true;
  }

  unselectMascot(unselectedMascot): void {
    unselectedMascot.selected = false;
    this.selectedMascots =
      this.selectedMascots.filter(mascot => mascot.school != unselectedMascot.school)
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

  submitPicks(): void {
    //picksService.submit(this.selectedMascots);
  }

  //////////
  // PRIVATE

  private initYears(): void {
    for (let year in MASCOT_DATA) { this.years.push(year); }
  }

  private initMascots(): void {
    this.mascots = [];
    for (let atts of MASCOT_DATA[this.selectedYear]) {
      this.mascots.push(new Mascot(atts));
    }
    this.shuffle(this.mascots);
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

  // http://www.itsmycodeblog.com/shuffling-a-javascript-array/
  // I miss ruby.
  private shuffle(array): any[] {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
