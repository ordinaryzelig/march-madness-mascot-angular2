import { MASCOT_DATA } from './mascot-data.ts';
import { Mascot }      from './mascot.ts';

export class MascotService {
  selectedMascots = [];

  mascotsForYear(year): Mascot[] {
    let mascots = [];
    for (let atts of MASCOT_DATA[year]) {
      mascots.push(new Mascot(atts));
    }
    return mascots;
  }
}
