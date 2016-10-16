import { TestBed, async, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By }                                         from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { MascotService } from './mascot.service.ts';

describe('App: MarchMadnessMascotsAngular2', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule,
        HttpModule,
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    });
    this.fixture = TestBed.createComponent(AppComponent);
    this.app = this.fixture.debugElement.componentInstance;
  });

  it('should select the latest year by default', () => {
    let selectedYearOptions =
      this.fixture.debugElement.queryAll(By.css('#year-select option'));
    let selectedYearOption = selectedYearOptions.filter(
      (option) => {
        let selected = option.nativeElement.getAttribute('ng-reflect-selected');
        return selected == 'true';
      }
    )[0]
    expect(selectedYearOption.nativeElement.getAttribute('value')).toEqual('2015');
  });

  it('should list mascots', () => {
    let mascots = this.fixture.debugElement.queryAll(By.css('.mascot'));
    expect(mascots.length).toBeGreaterThan(0);
  });
});
