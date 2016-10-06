import { Mascot } from './mascot';
import { Tag }    from './tag';

export class Entry {
  mascots: Mascot[];
  tags: Tag[];

  constructor(mascots) {
    this.mascots = mascots;
    this.initTags();
  }

  selectedMascots(): Mascot[] {
    return this.mascots.filter(mascot => mascot.selected);
  }

  selectableMascots(): Mascot[] {
    return this.mascots.filter(
      mascot =>
        !mascot.selected
        && (
          mascot.tag.selected
          || this.selectedTags().length == 0
        )
    );
  }

  select(mascot): void {
    mascot.selected = true;
  }

  unselect(unselectedMascot): void {
    unselectedMascot.selected = false;
  }

  isComplete(): boolean {
    return this.selectedMascots().length == this.mascots.length;
  }

  /////////////////////////////////
  // Private

  private initTags(): void {
    let allTags = [];
    for (let mascot of this.mascots) { allTags.push(mascot.tag); }

    this.tags = Array.from(new Set(allTags));

    this.tags.sort((a, b) => {
      if (a.name < b.name) { return -1 };
      if (a.name > b.name) { return 1 };
      return 0;
    } );

  }

  private selectedTags(): Tag[] {
    return this.tags.filter(t => t.selected);
  }

  private showableTags(): Tag[] {
    return(
      this.selectedTags().length > 0
        ? this.selectedTags ()
        : this.tags
    );
  }

  private mapTagNames(tags): string[] {
    let tagNames = [];
    for (let tag of tags) { tagNames.push(tag.name); }
    return tagNames;
  }
}
