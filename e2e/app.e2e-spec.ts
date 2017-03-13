import { NiceBlogPage } from './app.po';

describe('nice-blog App', () => {
  let page: NiceBlogPage;

  beforeEach(() => {
    page = new NiceBlogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('blog works!');
  });
});
