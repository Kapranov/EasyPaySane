import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    back() {
      this.historyService.back();
    },
    forward() {
      this.historyService.forward();
    }
  }
});
