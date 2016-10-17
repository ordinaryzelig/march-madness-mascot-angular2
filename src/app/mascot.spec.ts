import { Mascot } from './mascot';
import { Tag }    from './tag';

describe('Mascot', () => {
  beforeEach(() => {
    this.mascot = new Mascot({
      'name': 'Sooners',
      'school': 'University of Oklahoma',
      'tag': new Tag('horse'),
    });
  });

  it('constructs imageFileName', () => {
    expect(this.mascot.imageFileName).toEqual('university_of_oklahoma_sooners.png');
  });

  describe('matches()', () => {
    it('returns true if school matches search term regex', () => {
      expect(this.mascot.matches('OK')).toEqual(true);
    });

    it('returns false if school does not match search term regex', () => {
      expect(this.mascot.matches('not even close')).toEqual(false);
    });

    it('returns true if name matches search term regex', () => {
      expect(this.mascot.matches('one')).toEqual(true);
    });

    it('returns false if name does not match search term regex', () => {
      expect(this.mascot.matches('not even close')).toEqual(false);
    });
  });
});
