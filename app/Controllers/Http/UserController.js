'use strict'

const User = use('App/Models/User')
const {validate,validateAll} = use('Validator')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   */
  async create ({ request, response, view }) {
    return view.render('user.create')
  }

  /**
   * Create/save a new user.
   * POST users
   */
  async store ({ request, response, session }) {
    //添加注册规则
    const rules= {
        username:'required|unique:users',
        email:'required|email|unique:users',
        password:'required|min:6|max:30'
    }
    const validation = await validateAll(request.all(),rules)

    console.log(validation)

    if(validation.fails()){
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    const newUser = request.only(['username','email','password'])
    const user = await User.create(newUser)

    return response.redirect(`/users/${user.id}`)
  }

  /**
   * Display a single user.
   * GET users/:id
   */
  async show ({ params, request, response, view }) {
    const user = await User.find(params.id)

    await user.loadMany({
        posts:builder=>builder.select('id','title','content'),
        profile:builder=>builder.select('weixin')
    })

    return view.render('user.show',{user:user.toJSON()})
    // await user.loadMany({
    //   posts:builder => builder.select('id','title','content')
    //   profile:builder =>builder.select('weixin')
    // })
    // const {username,email} = user.toJSON()
    //
    // const profile = await user
    //   .profile()
    //   .select('weixin','user_id')
    //   .fetch()
    //
    // const posts = await user
    //   .posts()
    //   .select('title','content')
    //   .fetch()
    //
    // return {
    //   username,
    //   email,
    //   profile,
    //   posts
    // }
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserController
