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
  title = 'app works!';

  mascots = [];
  showableMascots = [];
  tags = [];
  selectedYear = '2015';
  mascotImagePath = 'assets/images/mascots/';

  ngOnInit(): void {
    this.initMascots();
    this.showableMascots = this.mascots.slice(0);
    this.initTags();
  }

  filterMascots(): void {
    let tagNames = [];
    for (let tag of this.showableTags()) { tagNames.push(tag.name); }
    this.showableMascots =
      this.mascots.filter(mascot => {
        return tagNames.indexOf(mascot.tag) >= 0;
      });
  }

  //////////
  // PRIVATE

  private initMascots(): void {
    for (let atts of MASCOT_DATA[this.selectedYear]) {
      this.mascots.push(new Mascot(atts));
    }
  }

  private initTags(): void {
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
