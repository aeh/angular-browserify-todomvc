var expect = require('expect.js'),
    todoItems = require('./helpers/todoItems'),
    page = require('./helpers/page');

describe('Item', function() {
  it('should allow me to mark items as complete', function() {
    page.enterItem(todoItems[0]);
    page.enterItem(todoItems[1]);

    page.toggleItemAtIndex(0);
    page.getItemElementAtIndex(0).getAttribute('class').then(function(c) {
      expect(c).to.contain('completed');
    });
    page.getItemElementAtIndex(1).getAttribute('class').then(function(c) {
      expect(c).to.not.contain('completed');
    });

    page.toggleItemAtIndex(1);
    page.getItemElementAtIndex(0).getAttribute('class').then(function(c) {
      expect(c).to.contain('completed');
    });
    page.getItemElementAtIndex(1).getAttribute('class').then(function(c) {
      expect(c).to.contain('completed');
    });
  });

  it('should allow me to un-mark items as complete', function() {
    page.enterItem(todoItems[0]);
    page.enterItem(todoItems[1]);

    page.toggleItemAtIndex(0);
    page.getItemElementAtIndex(0).getAttribute('class').then(function(c) {
      expect(c).to.contain('completed');
    });
    page.getItemElementAtIndex(1).getAttribute('class').then(function(c) {
      expect(c).to.not.contain('completed');
    });

    page.toggleItemAtIndex(0);
    page.getItemElementAtIndex(0).getAttribute('class').then(function(c) {
      expect(c).to.not.contain('completed');
    });
    page.getItemElementAtIndex(1).getAttribute('class').then(function(c) {
      expect(c).to.not.contain('completed');
    });
  });

  it('should allow me to edit an item', function() {
    page.enterItems(todoItems);
    page.doubleClickItemAtIndex(1);

    page.editItemAtIndex(1, 'buy some sausages' + protractor.Key.ENTER);

    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be.equal(todoItems.length);
      expect(items).to.be.eql(todoItems.slice(0, 1).concat(['buy some sausages']).concat(todoItems.slice(2)));
    });
  });

  it('should show the remove button on hover', function() {
    page.enterItems(todoItems);

    page.getDestroyButtonForItemAtIndex(1).isDisplayed().then(function(displayed) {
      expect(displayed).to.be(false);
    });

    page.getItemElementAtIndex(1).then(function(item) {
      return browser.actions().mouseMove(item).perform();
    });
    page.getDestroyButtonForItemAtIndex(1).isDisplayed().then(function(displayed) {
      expect(displayed).to.be(true);
    });
  });
});
