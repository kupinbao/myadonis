'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const User =  use ('App/Models/User')


class UserSeeder {
  async run () {
    const users= [
      {username:'楚天',email:'333@qq.com',PASSWORD:'111111'},
      {username:'闫冰',email:'444@qq.com',PASSWORD:'111111'}
    ]
    User.createMany(users)
  }
}

module.exports = UserSeeder
