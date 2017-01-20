import { Component, Input } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-category-select',
  templateUrl: './component.html',
})

export class CategorySelectComponent {
  @Input() tags: any;

  ngAfterViewInit() {
    this.initTagDropdown();
  }

  private initTagDropdown() {
    jQuery(document).ready(function() {
      jQuery('.tags .dropdown .dropdown-toggle')
        .dropdown()
        // Prevent menu from closing when clicking.
        .parent().find('.dropdown-menu')
        .on('click', e => e.stopPropagation());
    })
  }
}
