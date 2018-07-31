'use strict'

const Schema = use('Schema')

class ProfileSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.string('weixin')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')//外键
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
