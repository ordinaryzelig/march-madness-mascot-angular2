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

  this.findSelectable = (mascot) => {
    return this.fixture.debugElement.query(By.css(`#mascot_${mascot.id()}`));
  }
  this.findRank = (mascot) => {
    return this.fixture.debugElement.query(By.css(`#rank_${mascot.id()}`));
  }

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

  it('should select a mascot, remove it from the list of selectables, and add it to the ranks', () => {
    let mascot = this.app.selectableMascots()[0];

    expect(this.findSelectable(mascot)).toBeTruthy();
    expect(this.findRank(mascot)).toBeNull();

    mascot.selected = true;
    this.fixture.detectChanges();

    expect(this.findSelectable(mascot)).toBeNull();
    expect(this.findRank(mascot)).toBeTruthy();
  });

  it('should unselect a mascot, remove it from the ranks, and add it back to selectables', () => {
    let mascot = this.app.selectableMascots()[0];
    mascot.selected = true;
    this.fixture.detectChanges();

    expect(this.findSelectable(mascot)).toBeNull();
    expect(this.findRank(mascot)).toBeTruthy();

    mascot.selected = false;
    this.fixture.detectChanges();

    expect(this.findSelectable(mascot)).toBeTruthy();
    expect(this.findRank(mascot)).toBeNull();
  });

  it('should filter mascots with search by school and name', () => {
    let mascot = this.app.selectableMascots()[0];

    // By school.
    this.app.searchTerm = mascot.school;
    this.fixture.detectChanges();

    expect(this.findSelectable(mascot)).toBeTruthy();

    this.app.searchTerm = 'doesnotexist';
    this.fixture.detectChanges();

    expect(this.findSelectable(mascot)).toBeNull();

    // By mascot name.
    this.app.searchTerm = mascot.name;
    this.fixture.detectChanges();

    expect(this.findSelectable(mascot)).toBeTruthy();

    this.app.searchTerm = 'doesnotexist';
    this.fixture.detectChanges();

    expect(this.findSelectable(mascot)).toBeNull();
  });

  it('should not include a mascot that is selected even if search matches', () => {
    let mascot = this.app.selectableMascots()[0];
    mascot.selected = true;
    this.app.searchTerm = mascot.school;
    this.fixture.detectChanges();

    expect(this.findSelectable(mascot)).toBeNull();
  });

  it('filters mascots by tag', () => {
    let mascot = this.app.selectableMascots()[0];
    let otherTag = this.app.tags().filter((tag) => tag != mascot.tag)[0]

    otherTag.selected = true;
    this.fixture.detectChanges();
    expect(this.findSelectable(mascot)).toBeNull();

    mascot.tag.selected = true;
    this.fixture.detectChanges();
    expect(this.findSelectable(mascot)).toBeTruthy();
  });

  it('chooses the rest of the mascots for the user in random order', () => {
    this.app.selectRestRandomly();
    expect(this.app.entryIsComplete()).toEqual(true);
  });
});
