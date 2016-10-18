import { Mascot } from './mascot';
import { Tag }    from './tag';

export class Entry {
  mascots: Mascot[];
  selectedIds: string[];
  mascotsById: any = {};
  tags: Tag[];

  constructor(mascots) {
    this.mascots = mascots;
    this.selectedIds = [];
    this.initMascotsById();
    this.initTags();
  }

  select(mascot) {
    mascot.selected = true;
    this.selectedIds.push(mascot.id);
  }

  unselect(unselectedMascot) {
    unselectedMascot.selected = false;
    let idx = this.selectedIds.indexOf(unselectedMascot.id);
    this.selectedIds.splice(idx, 1);
  }

  selectedMascots(): Mascot[] {
    let selected = [];
    this.selectedIds.forEach(mascotId => selected.push(this.mascotsById[mascotId]));
    return selected;
  }

  selectableMascots(): Mascot[] {
    return this.mascots.filter(mascot =>
      !mascot.selected
      && (
        mascot.tag.selected
        || this.selectedTags().length == 0
      )
    );
  }

  isComplete(): boolean {
    return this.selectedMascots().length == this.mascots.length;
  }

  /////////////////////////////////
  // Private

  private initMascotsById() {
    this.mascotsById = {};
    this.mascots.forEach(mascot => this.mascotsById[mascot.id] = mascot);
  }

  private initTags() {
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

  private mapTagNames(tags): string[] {
    let tagNames = [];
    for (let tag of tags) { tagNames.push(tag.name); }
    return tagNames;
  }
}
