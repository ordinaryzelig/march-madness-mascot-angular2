import { Mascot } from './mascot';
import { Tag }    from './tag';
import { Entry }  from './entry';

describe('Entry', () => {
  describe('selectableMascots()', () => {
    beforeEach(() => {
      this.mascot = new Mascot({
        'name': 'sooners',
        'school': 'University of Oklahoma',
        'tag': (new Tag('horse')),
      });
      this.anotherMascot = new Mascot({
        'name': 'cowboys',
        'school': 'Oklahoma State University',
        'tag': (new Tag('evil')),
      });
      this.allMascots = [this.mascot, this.anotherMascot];
      this.entry = new Entry(this.allMascots);
    });

    it('includes all Mascots when no Tags selected', () => {
      expect(this.entry.selectableMascots()).toEqual(this.allMascots);
    });

    it('excludes Mascots already selected', () => {
      this.mascot.selected = true;
      expect(this.entry.selectableMascots()).toEqual([this.anotherMascot]);
    });

    it('includes Mascot if Tag is selected', () => {
      this.mascot.tag.selected = true;
      expect(this.entry.selectableMascots()).toEqual([this.mascot]);
    });

    it('!isComplete when not all mascots selected', () => {
      expect(this.entry.isComplete()).toEqual(false);
    });

    it('isComplete when all mascots selected', () => {
      for (let m of this.allMascots) { this.entry.select(m); }
      expect(this.entry.isComplete()).toEqual(true);
    });

    it('preserves order of selection', () => {
      this.entry.select(this.anotherMascot);
      this.entry.select(this.mascot);
      expect(this.entry.selectedMascots()).toEqual([this.anotherMascot, this.mascot]);

      this.entry.unselect(this.anotherMascot);
      this.entry.select(this.anotherMascot);
      expect(this.entry.selectedMascots()).toEqual([this.mascot, this.anotherMascot]);
    });
  });
});
