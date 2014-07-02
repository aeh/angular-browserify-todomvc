var expect = require('expect.js'),
    todoItems = require('./helpers/todoItems'),
    page = require('./helpers/page');

xdescribe('Editing', function() {
  it('should hide other controls when editing', function() {
    page.enterItems(todoItems);
    page.doubleClickItemAtIndex(1);

    page.getToggleForItemAtIndex(1).isDisplayed().then(function(displayed) {
      expect(displayed).to.be(false);
    });
    page.getLabelForItemAtIndex(1).isDisplayed().then(function(displayed) {
      expect(displayed).to.be(false);
    });
  });

  it('should save edits on enter', function() {
    page.enterItems(todoItems);
    page.doubleClickItemAtIndex(1);

    page.editItemAtIndex(1, 'buy some sausages' + protractor.Key.RETURN);

    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be.equal(todoItems.length);
      expect(items).to.be.eql(todoItems.slice(0, 1).concat(['buy some sausages']).concat(todoItems.slice(2)));
    });
  });

  it('should save edits on blur', function() {
    page.enterItems(todoItems);
    page.doubleClickItemAtIndex(1);

    page.editItemAtIndex(1, 'buy some sausages');

    // click a toggle button so that the blur() event is fired
    page.toggleItemAtIndex(0);

    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be.equal(todoItems.length);
      expect(items).to.be.eql(todoItems.slice(0, 1).concat(['buy some sausages']).concat(todoItems.slice(2)));
    });
  });

  it('should trim entered text', function() {
    page.enterItems(todoItems);
    page.doubleClickItemAtIndex(1);

    page.editItemAtIndex(1, '   buy some sausages  ' + protractor.Key.RETURN);

    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be.equal(todoItems.length);
      expect(items).to.be.eql(todoItems.slice(0, 1).concat(['buy some sausages']).concat(todoItems.slice(2)));
    });
  });

  it('should remove the item if an empty string was entered', function() {
    page.enterItems(todoItems);
    page.doubleClickItemAtIndex(1);

    page.editItemAtIndex(1, protractor.Key.RETURN);

    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be.equal(todoItems.length - 1);
      expect(items).to.be.eql(todoItems.slice(0, 1).concat(todoItems.slice(2)));
    });
  });

  it('should cancel edits on escape', function() {
    page.enterItems(todoItems);
    page.doubleClickItemAtIndex(1);

    page.editItemAtIndex(1, 'foo' + protractor.Key.ESCAPE);

    page.getItemsMap(function(item) { return item.getText(); }).then(function(items) {
      expect(items.length).to.be.equal(todoItems.length);
      expect(items).to.be.eql(todoItems);
    });
  });
});
