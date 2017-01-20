import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }               from './app.component';
import { CategorySelectComponent }    from './category-select/component';
import { EntrySubmissionComponent }   from './entry-submission/component';
import { MascotImageComponent }       from './mascot-image/component';
import { MascotSearchComponent }      from './mascot-search/component';
import { MascotsSelectableComponent } from './mascots-selectable/component';
import { NavbarComponent }            from './navbar/component';
import { RanksComponent }             from './ranks/component';

@NgModule({
  declarations: [
    AppComponent,
    CategorySelectComponent,
    EntrySubmissionComponent,
    MascotImageComponent,
    MascotSearchComponent,
    MascotsSelectableComponent,
    NavbarComponent,
    RanksComponent,
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
