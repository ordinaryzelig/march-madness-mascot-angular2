import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }               from './app.component';
import { NavbarComponent }            from './navbar/component';
import { MascotsSelectableComponent } from './mascots-selectable/component';
import { EntrySubmissionComponent }   from './entry-submission/component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MascotsSelectableComponent,
    EntrySubmissionComponent
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
