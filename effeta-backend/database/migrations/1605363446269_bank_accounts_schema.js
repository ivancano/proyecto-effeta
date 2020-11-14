'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BankAccountsSchema extends Schema {
  up () {
    this.create('bank_accounts', (table) => {
      table.increments()
      table.integer('contributor_id').unsigned().index()
      table.foreign('contributor_id').references('id').on('contributors').onDelete('cascade')
      table.string('cbu', 255).notNullable()
      table.string('account_holder', 255).notNullable()
      table.string('bank_name', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('bank_accounts')
  }
}

module.exports = BankAccountsSchema
