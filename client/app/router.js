import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('payment');
  this.route('payments');
  this.route('user');
  this.route('index');
  this.route('login');
  this.route('register');
});

export default Router;
