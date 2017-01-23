import { Component, Input, Output, EventEmitter } from '@angular/core';

import { EntryService }  from '../entry.service';

declare var Spinner: any;

@Component({
  selector: 'app-entry-submission',
  templateUrl: './component.html',
  styleUrls: [
    '../layout.less',
    './component.less',
  ],
  providers: [
    EntryService,
  ],
})

export class EntrySubmissionComponent {
  @Input() entry: any;
  submittingPicks: boolean;
  picksSubmittedSuccessfully = null;
  spinner: any;

  constructor(
    private entryService: EntryService,
  ) {}

  submitPicks() {
    this.submittingPicks = true;
    this.startSpinner();
    this.entryService
      .submit(this.entry)
      .subscribe(
        result => this.picksSubmittedSuccessfully = result,
        error => this.failedSubmittingPicks(error),
      );
  }

  showFinishedMessage(): boolean {
    return this.picksSubmittedSuccessfully;
  }

  private failedSubmittingPicks(error: any) {
    console.log(error);
    alert("I fail. Sorry. Please copy/paste your list and email them to me.");
    this.stopSpinner();
  }

  private startSpinner() {
    var opts = {
      length: 8,
      radius: 5,
      width: 3,
      opacity: 0,
    };
    this.spinner = new Spinner(opts).spin(document.getElementById('submit'));
  }

  private stopSpinner() {
    this.spinner.stop();
  }

}
