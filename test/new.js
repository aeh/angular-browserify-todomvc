var expect = require('expect.js'),
    todoItems = require('./helpers/todoItems'),
    page = require('./helpers/page');

describe('New Todo', function() {
  it('should allow me to add todo items', function() {
    page.enterItem(todoItems[0]);
    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be.equal(1);
      expect(items).to.be.eql(todoItems.slice(0, 1));
    });

    page.enterItem(todoItems[1]);
    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be.equal(2);
      expect(items).to.be.eql(todoItems.slice(0, 2));
    });
  });

  it('should clear text input field when an item is added', function() {
    page.enterItem(todoItems[0]);
    page.getItemInputField().getAttribute('value').then(function(value) {
      expect(value).to.be('');
    });
  });

  it('should append new items to the bottom of the list', function() {
    page.enterItems(todoItems);
    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be.equal(todoItems.length);
      expect(items).to.be.eql(todoItems);
    });
  });

  it('should trim text input', function() {
    page.enterItem('   ' + todoItems[0] + '  ');
    page.getItemElementAtIndex(0).getText().then(function(item) {
      expect(item).to.be.eql(todoItems[0]);
    });
  });

  it('should show #main and #footer when items added', function() {
    page.enterItem(todoItems[0]);
    element(by.css('section#main')).isDisplayed(function(displayed) {
      expect(displayed).to.be(true);
    });
    element(by.css('footer#footer')).isDisplayed(function(displayed) {
      expect(displayed).to.be(true);
    });
  });
});
