import Ember from 'ember';

export default Ember.Component.extend({
  menu: [{
    'title': 'Index',
    'link': 'index'
  }, {
    'title': 'Payments',
    'link': 'payments'
  }],

  actions: {
    invalidateSession() {
      this.sendAction('invalidateSession');
    },
    back() {
      this.sendAction('back');
    },
    forward() {
      this.sendAction('forward');
    }
  }
});
