'use strict'

const Model = use('Model')

class Tag extends Model {
  posts(){
    return this.belongsToMany('App/Models/Post')
  }
  user(){
    return this.belongsToMany('App/Models/User')
  }
}

module.exports = Tag
