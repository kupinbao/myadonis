'use strict'

/*
|--------------------------------------------------------------------------
| PostfileSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Profile = use('App/Models/Profile')

class ProfileSeeder {
  async run () {
    const profiles= [
    {weixin:'mingyang',user_id:1},
    {weixin:'muyuan',user_id:2},
    {weixin:'chutian',user_id:3},
    {weixin:'yanbing',user_id:4}
  ]
  await Profile.createMany(profiles)
  }
}

module.exports = ProfileSeeder
