import { Component, Input, Output, EventEmitter } from '@angular/core';

import { EntryService }  from '../entry.service';

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

  constructor(
    private entryService: EntryService,
  ) {}

  submitPicks() {
    this.submittingPicks = true;
    this.entryService
      .submit(this.entry)
      .subscribe(
        result => this.picksSubmittedSuccessfully = result,
        error => this.failedSubmittingPicks(error),
      );
  }

  showFinishedMessage(): boolean {
    return this.entry.isComplete() && this.picksSubmittedSuccessfully;
  }

  private failedSubmittingPicks(error: any) {
    console.log(error);
    alert("I fail. Sorry. Please copy/paste your list and email them to me.");
  }
}
