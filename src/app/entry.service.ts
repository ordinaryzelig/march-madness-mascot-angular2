import { Injectable }                    from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable }                    from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class EntryService {
  entriesUrl = '/entries';

  constructor(private http: Http) {}

  submit(entry): Observable<boolean> {
    let body = JSON.stringify({
      mascots: entry.selectedMascots(),
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.entriesUrl, body, options)
      .map(this.getResult)
      .catch(this.handleError);
  }

  private getResult(response): boolean {
    return response.status == 200;
  }

  private handleError(error) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
