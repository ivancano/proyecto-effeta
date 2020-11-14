'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContributionsSchema extends Schema {
  up () {
    this.create('contributions', (table) => {
      table.increments()
      table.integer('contributor_id').unsigned().index()
      table.foreign('contributor_id').references('id').on('contributors').onDelete('cascade')
      table.integer('payment_id').unsigned().index()
      table.foreign('payment_id').references('id').on('payments').onDelete('cascade')
      table.string('detail', 255).nullable()
      table.integer('type').notNullable()
      table.date('due_date').notNullable()
      table.decimal('amount', 10, 2).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('contributions')
  }
}

module.exports = ContributionsSchema
