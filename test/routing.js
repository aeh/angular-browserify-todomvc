var expect = require('expect.js'),
    todoItems = require('./helpers/todoItems'),
    page = require('./helpers/page');

describe('Routing', function() {
  it('should allow me to display active items', function() {
    page.enterItems(todoItems);
    page.toggleItemAtIndex(1);
    page.getFilterElement('Active').click();
    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be(2);
      expect(items).to.be.eql(todoItems.slice(0, 1).concat(todoItems.slice(2)));
    });
  });

  it('should respect the back button', function() {
    page.enterItems(todoItems);
    page.toggleItemAtIndex(1);

    page.getFilterElement('Active').click();
    page.getFilterElement('Completed').click();

    // should show completed items
    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be(1);
      expect(items).to.be.eql(todoItems.slice(1, 2));
    });

    // then active items again
    page.back();
    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be(todoItems.length - 1);
      expect(items).to.be.eql(todoItems.slice(0, 1).concat(todoItems.slice(2)));
    });

    // then all items
    page.back();
    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be(todoItems.length);
      expect(items).to.be.eql(todoItems);
    });
  });

  it('should allow me to display completed items', function() {
    page.enterItems(todoItems);
    page.toggleItemAtIndex(1);
    page.getFilterElement('Completed').click();

    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be(1);
      expect(items).to.be.eql(todoItems.slice(1, 2));
    });
  });

  it('should allow me to display all items', function() {
    page.enterItems(todoItems);
    page.toggleItemAtIndex(1);

    // apply the other filters first, before returning to the 'all' state
    page.getFilterElement('Active').click();
    page.getFilterElement('Completed').click();
    page.getFilterElement('All').click();

    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be(todoItems.length);
      expect(items).to.be.eql(todoItems);
    });
  });

  it('should highlight the currently applied filter', function() {
    page.enterItems(todoItems);

    // initially 'all' should be selected
    page.getFilterElement('All').getAttribute('class').then(function(c) {
      expect(c).to.contain('selected');
    });

    page.getFilterElement('Active').click();
    page.getFilterElement('Active').getAttribute('class').then(function(c) {
      expect(c).to.contain('selected');
    });

    page.getFilterElement('Completed').click();
    page.getFilterElement('Completed').getAttribute('class').then(function(c) {
      expect(c).to.contain('selected');
    });
  });
});
