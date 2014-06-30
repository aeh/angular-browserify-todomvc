var expect = require('expect.js'),
    todoItems = require('./helpers/todoItems'),
    page = require('./helpers/page');

describe('Mark all as completed', function() {
  it('should allow me to mark all items as completed', function() {
    page.enterItems(todoItems);
    page.getMarkAllCompletedCheckBox().click();

    page.getItemsMap(function(item) { return item.getAttribute('class'); }).then(function(classes) {
      classes.forEach(function(c) {
        expect(c).to.contain('completed');
      });
    });
  });

  it('should allow me to clear the completion state of all items', function() {
    page.enterItems(todoItems);
    page.getMarkAllCompletedCheckBox().click().click();

    page.getItemsMap(function(item) { return item.getAttribute('class'); }).then(function(classes) {
      classes.forEach(function(c) {
        expect(c).to.not.contain('completed');
      });
    });
  });

  it('complete all checkbox should update state when items are completed / cleared', function() {
    page.enterItems(todoItems);
    page.getMarkAllCompletedCheckBox().click();

    page.getMarkAllCompletedCheckBox().isSelected().then(function(selected) {
      expect(selected).to.be(true);
    });

    // all items are complete, now mark on as not-complete
    page.toggleItemAtIndex(0);
    page.getMarkAllCompletedCheckBox().isSelected().then(function(selected) {
      expect(selected).to.be(false);
    });
 
    // now mark as complete, do that once again all items are complete
    page.toggleItemAtIndex(0);
    page.getMarkAllCompletedCheckBox().isSelected().then(function(selected) {
      expect(selected).to.be(true);
    });
  });
});
