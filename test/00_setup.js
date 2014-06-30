var page = require('./helpers/page');

beforeEach(function() {
  browser.get('/');
  page.getMarkAllCompletedCheckBox().isDisplayed().then(function(displayed) {
    if (!displayed) return;
    page.getMarkAllCompletedCheckBox().isSelected().then(function(selected) {
      if (!selected) page.getMarkAllCompletedCheckBox().click();
      element(by.css('button#clear-completed')).click();
    });
  });
});
