'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contribution extends Model {

    contributor() {
        return this.belongsTo('App/Models/Contributor')
    }

    payment() {
        return this.belongsTo('App/Models/Payment')
    }
}

module.exports = Contribution
