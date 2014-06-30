var expect = require('expect.js'),
    page = require('./helpers/page');

describe('No Todos', function() {
  it('should hide #main and #footer', function() {
    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be.equal(0);
    });
    element(by.css('section#main')).isDisplayed(function(displayed) {
      expect(displayed).to.be(false);
    });
    element(by.css('footer#footer')).isDisplayed(function(displayed) {
      expect(displayed).to.be(false);
    });
  });
});
