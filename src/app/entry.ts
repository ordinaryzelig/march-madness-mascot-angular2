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

  selectableMascots(): Mascot[] {
    let tagNames = this.mapTagNames(this.showableTags());
    return this.mascots.filter(
      mascot =>
        !mascot.selected
        && tagNames.indexOf(mascot.tag) >= 0
    );
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

  isComplete(): boolean {
    return this.selected.length == this.mascots.length;
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

  private showableTags(): Tag[] {
    let selectedTags = this.tags.filter(t => t.selected);
    return(
      selectedTags.length > 0
        ? selectedTags 
        : this.tags
    );
  }

  private mapTagNames(tags): string[] {
    let tagNames = [];
    for (let tag of tags) { tagNames.push(tag.name); }
    return tagNames;
  }
}
