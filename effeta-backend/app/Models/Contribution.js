'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contribution extends Model {

    static STATUS_PENDING = 0;
    static STATUS_PAID = 1;
    static STATUS_EXPIRED = 2;

    contributor() {
        return this.belongsTo('App/Models/Contributor')
    }

    payment() {
        return this.belongsTo('App/Models/Payment')
    }
}

module.exports = Contribution
