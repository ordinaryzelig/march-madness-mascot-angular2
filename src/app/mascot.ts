import { Tag } from './tag';

export class Mascot {
  name: string;
  school: string;
  tag: Tag;
  selected: boolean;

  constructor(atts) {
    for (let attr of ['school', 'name', 'tag']) {
      this[attr] = atts[attr];
    }
  }

  imageFileName(): string {
    return this.underscore(`${this.school}_${this.name}`).toLowerCase() + '.png';
  };

  matches(searchTerm): boolean {
    return ['school', 'name'].some(
      attr => {
        let regex = new RegExp(searchTerm, 'i');
        return regex.test(this[attr]);
      }
    );
  }

  ///////////////////////////////
  // private

  private underscore(str): string {
    return str
      .replace(/['.]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '_')
  };
}
