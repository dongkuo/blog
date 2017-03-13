import { browser, element, by } from 'protractor';

export class NiceBlogPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('blog-root h1')).getText();
  }
}
