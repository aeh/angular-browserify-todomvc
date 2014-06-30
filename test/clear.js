var expect = require('expect.js'),
    todoItems = require('./helpers/todoItems'),
    page = require('./helpers/page');

describe('Clear completed button', function() {
  it('should display the number of completed items', function() {
    page.enterItems(todoItems);

    page.toggleItemAtIndex(1);
    page.getClearCompleteButton().getText().then(function(text) {
      expect(text).to.be('Clear completed (1)');
    });

    page.toggleItemAtIndex(2);
    page.getClearCompleteButton().getText().then(function(text) {
      expect(text).to.be('Clear completed (2)');
    });
  });

  it('should remove completed items when clicked', function() {
    page.enterItems(todoItems);

    page.toggleItemAtIndex(1);
    page.getClearCompleteButton().click();
    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be(2);
      expect(items).to.be.eql(todoItems.slice(0, 1).concat(todoItems.slice(2)));
    });
  });

  it('should be hidden when there are no items that are completed', function() {
    page.enterItems(todoItems);

    page.toggleItemAtIndex(1);
    page.getClearCompleteButton().isDisplayed().then(function(displayed) {
      expect(displayed).to.be(true);
    });

    page.getClearCompleteButton().click();
    page.getClearCompleteButton().isDisplayed().then(function(displayed) {
      expect(displayed).to.be(false);
    });
  });
});
