'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BankAccount extends Model {

    contributor() {
        return this.belongsTo('App/Models/Contributor')
    }
    
}

module.exports = BankAccount
