import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MultiselectDropdown, MultiSelectSearchFilter } from '../../node_modules/angular-2-dropdown-multiselect/src/multiselect-dropdown';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MultiselectDropdown,
    MultiSelectSearchFilter,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
