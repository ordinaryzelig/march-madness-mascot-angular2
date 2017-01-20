import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-select',
  templateUrl: './component.html',
})

export class CategorySelectComponent {
  @Input() tags: any;
}
