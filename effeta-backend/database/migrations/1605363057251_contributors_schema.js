'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContributorsSchema extends Schema {
  up () {
    this.create('contributors', (table) => {
      table.increments()
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('id').on('users').onDelete('cascade')
      table.string('name', 255).notNullable()
      table.string('lastname', 255).notNullable()
      table.string('dni', 255).notNullable()
      table.integer('type').notNullable()
      table.string('address').notNullable()
      table.string('phone').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('contributors')
  }
}

module.exports = ContributorsSchema
