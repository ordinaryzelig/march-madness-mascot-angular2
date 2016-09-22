import { MarchMadnessMascotsAngular2Page } from './app.po';

describe('march-madness-mascots-angular2 App', function() {
  let page: MarchMadnessMascotsAngular2Page;

  beforeEach(() => {
    page = new MarchMadnessMascotsAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
