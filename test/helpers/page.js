'use strict';

var q = require('q');

var page = module.exports = {
  back: function() {
    browser.navigate().back();
  },

  getItemInputField: function() {
    return element(by.xpath('//input[@id="new-todo"]'));
  },
  getItemElements: function() {
    return element.all(by.xpath('//ul[@id="todo-list"]/li'));
  },
  getItemElementAtIndex: function(i) {
    return element(by.xpath('//ul[@id="todo-list"]/li[' + (i + 1) + ']'));
  },
  getLabelForItemAtIndex: function(i) {
    return element(by.xpath('//ul[@id="todo-list"]/li[' + (i + 1) + ']//label'));
  },
  getToggleForItemAtIndex: function(i) {
    return element(by.xpath('//ul[@id="todo-list"]/li[' + (i + 1) + ']//input[contains(@class, "toggle")]'));
  },
  getEditInputForItemAtIndex: function(i) {
    return element(by.xpath('//ul[@id="todo-list"]/li[' + (i + 1) + ']//input[contains(@class,"edit")]'));
  },
  getDestroyButtonForItemAtIndex: function(i) {
    return element(by.xpath('//ul[@id="todo-list"]/li[' + (i + 1) + ']//button[contains(@class,"destroy")]'));
  },
  getMarkAllCompletedCheckBox: function() {
    return element(by.xpath('//input[@id="toggle-all"]'));
  },
  getItemsCountElement: function() {
    return element(by.xpath('//span[@id="todo-count"]'));
  },
  getClearCompleteButton: function() {
    return element(by.xpath('//button[@id="clear-completed"]'));
  },
  getFilterElements: function() {
    return element.all(by.xpath('//ul[@id="filters"]//a'));
  },
  getFilterElement: function(filter) {
    return element(by.xpath('//ul[@id="filters"]//a[contains(text(), "' + filter + '")]'));
  },
  getItemsMap: function(func) {
    return page.getItemElements().then(function(items) {
      return q.all(items.map(func));
    });
  },

  enterItem: function(todo) {
    page.getItemInputField().sendKeys(todo + protractor.Key.RETURN);
  },
  enterItems: function(todos) {
    todos.forEach(function(todo) {
      page.enterItem(todo);
    });
  },
  toggleItemAtIndex: function(i) {
    page.getToggleForItemAtIndex(i).click();
  },
  doubleClickItemAtIndex: function(i) {
    page.getItemElementAtIndex(1).then(function(item) {
      return browser.actions().doubleClick(item).perform();
    });
  },
  editItemAtIndex: function(i, todo) {
    page.getEditInputForItemAtIndex(i).then(function(item) {
      // send 50 delete keypresses, just to be sure the item text is deleted
      item.sendKeys((new Array(51)).join(protractor.Key.BACK_SPACE) + todo);
    });
  }
};
