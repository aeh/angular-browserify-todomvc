var expect = require('expect.js'),
    todoItems = require('./helpers/todoItems'),
    page = require('./helpers/page');

describe('Counter', function() {
  it('should display the current number of todo items', function() {
    page.enterItem(todoItems[0]);
    page.getItemsCountElement().getText().then(function(text) {
      expect(text).to.be('1 item left');
    });

    page.enterItem(todoItems[1]);
    page.getItemsCountElement().getText().then(function(text) {
      expect(text).to.be('2 items left');
    });
  });
});
