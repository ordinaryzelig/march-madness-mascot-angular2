import { Tag } from './tag';

export class TagSet {
  set = {};

  existingOrNew(name): Tag {
    let existing = this.set[name];
    if (existing) {
      return existing;
    } else {
      return this.set[name] = new Tag(name);
    }
  }
}
