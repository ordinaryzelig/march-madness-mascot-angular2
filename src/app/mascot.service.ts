import { MASCOT_DATA } from './mascot-data';
import { Mascot }      from './mascot';
import { TagSet }      from './tag-set';
import { Entry  }      from './entry';

export class MascotService {
  tagSet = new TagSet();

  eligibleYears(): number[] {
    let years = [];
    for (let year in MASCOT_DATA) { years.push(year); }
    return years;
  }

  entryForYear(year): Entry {
    return new Entry(this.shuffle(this.mascotsForYear(year)));
  }

  ////////////////////////
  // Private

  private mascotsForYear(year): Mascot[] {
    let mascots = [];
    for (let atts of MASCOT_DATA[year]) {
      mascots.push(new Mascot({
        school: atts.school,
        name: atts.name,
        tag: this.tagSet.existingOrNew(atts.tag),
      }));
    }
    return mascots;
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
