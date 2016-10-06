export class Entry {
  mascots = [];
  selected = [];

  constructor(mascots) {
    this.mascots = mascots;
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
}
