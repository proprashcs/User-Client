import { DistributionFrontendAngularPage } from './app.po';

describe('distribution-frontend-angular App', () => {
  let page: DistributionFrontendAngularPage;

  beforeEach(() => {
    page = new DistributionFrontendAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
