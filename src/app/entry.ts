import { Mascot } from './mascot';
import { Tag }    from './tag';

export class Entry {
  mascots = [];
  selected = [];
  tags = [];

  constructor(mascots) {
    this.mascots = mascots;
    this.initTags();
  }

  select(mascot): void {
    this.selected.push(mascot);
    mascot.selected = true;
  }

  unselect(unselectedMascot): void {
    unselectedMascot.selected = false;
    this.selected =
      this.selected.filter(mascot => mascot.school != unselectedMascot.school);
  }

  /////////////////////////////////
  // Private

  private initTags(): void {
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
}
