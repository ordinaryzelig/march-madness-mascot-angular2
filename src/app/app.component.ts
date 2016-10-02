import { Component, OnInit } from '@angular/core';

import { MASCOT_DATA } from './mascot-data';
import { Mascot }      from './mascot';
import { Tag }         from './tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  mascots = [];
  showableMascots = [];
  tags = [];
  years = [];
  selectedYear = null;
  mascotImagePath = 'assets/images/mascots/';

  ngOnInit(): void {
    this.initYears();
    this.changeYear(this.years[this.years.length - 1]);
  }

  filterMascots(): void {
    let tagNames = [];
    for (let tag of this.showableTags()) { tagNames.push(tag.name); }
    this.showableMascots =
      this.mascots.filter(mascot => {
        return tagNames.indexOf(mascot.tag) >= 0;
      });
  }

  changeYear(year): void {
    this.selectedYear = year;
    this.initMascots();
    this.showableMascots = this.mascots.slice(0);
    this.initTags();
  }

  //////////
  // PRIVATE

  initYears(): void {
    for (let year in MASCOT_DATA) { this.years.push(year); }
  }

  private initMascots(): void {
    this.mascots = [];
    for (let atts of MASCOT_DATA[this.selectedYear]) {
      this.mascots.push(new Mascot(atts));
    }
  }

  private initTags(): void {
    this.tags = [];
    let tagNames = new Set([]);
    for (let mascot of this.mascots) { tagNames.add(mascot.tag); }

    tagNames.forEach(tagName => {
      this.tags.push(new Tag(tagName));
    });
  }

  private showableTags(): Tag[] {
    let selectedTags = this.tags.filter(t => { return t.selected });
    return selectedTags.length > 0 ? selectedTags : this.tags;
  }
}
