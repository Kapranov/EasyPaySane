import DS from 'ember-data';

export default DS.Model.extend({
  contract: DS.attr('string'),
  surname: DS.attr('string'),
  sum: DS.attr('number'),
  commissionOne: DS.attr('number'),
  commissionTwo: DS.attr('number'),
  commission: DS.attr('number'),
  totalAmount: DS.attr('number'),
  email: DS.attr('string'),
  telephone: DS.attr('string')
});
