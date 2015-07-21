/**
* Payment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    contract : { type: 'string' },

    surname : { type: 'string' },

    sum : { type: 'integer' },

    commissionOne : { type: 'float' },

    commissionTwo : { type: 'integer' },

    commission : { type: 'float' },

    totalAmount : { type: 'integer' },

    email : { type: 'string' },

    telephone : { type: 'string' }
  }
};

