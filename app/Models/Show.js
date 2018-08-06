'use strict'

const Model = use('Model')

class Post extends Model {

  user(){
    return this.belongsToMany('App/Models/User')
  }

}

module.exports = Post
