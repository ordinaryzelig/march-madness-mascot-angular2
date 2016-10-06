import { MASCOT_DATA } from './mascot-data.ts';
import { Mascot }      from './mascot.ts';

export class MascotService {
  selected = [];

  mascotsForYear(year): Mascot[] {
    let mascots = [];
    for (let atts of MASCOT_DATA[year]) {
      mascots.push(new Mascot(atts));
    }
    return mascots;
  }

  eligibleYears(): number[] {
    let years = [];
    for (let year in MASCOT_DATA) { years.push(year); }
    return years;
  }

  clearSelected(): void {
    this.selected = [];
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
