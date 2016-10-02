export class Mascot {
  name: string;
  school: string;
  tag: string;
  selected: boolean;

  constructor(atts) {
    for (let attr of ['school', 'name', 'tag']) {
      this[attr] = atts[attr];
    }
  }

  imageFileName(): string {
    return this.underscore(`${this.school}_${this.name}`).toLowerCase() + '.png';
  };

  private underscore(str): string {
    return str
      .replace(/['.]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '_')
  };
}
