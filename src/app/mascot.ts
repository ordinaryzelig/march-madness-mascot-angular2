import { Tag } from './tag';

export class Mascot {
  name: string;
  school: string;
  tag: Tag;
  selected: boolean;
  imageFileName: string;

  constructor(atts) {
    for (let attr of ['school', 'name', 'tag']) {
      this[attr] = atts[attr];
    }
    this.imageFileName = this.generateImageFileName();
  }

  matches(searchTerm): boolean {
    return ['school', 'name'].some(
      attr => {
        let regex = new RegExp(searchTerm, 'i');
        return regex.test(this[attr]);
      }
    );
  }

  id(): string { return this.underscore(`${this.school}_${this.name}`); }

  ///////////////////////////////
  // private

  private generateImageFileName(): string {
    return this.underscore(`${this.school}_${this.name}`).toLowerCase() + '.png';
  };

  private underscore(str): string {
    return str
      .replace(/['.]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '_')
  };
}
