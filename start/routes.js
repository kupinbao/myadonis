'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')
const Profile = use('App/Models/Profile')

Route.on('/').render('welcome')

Route.get('login','AuthController.login')
      .as('login')

Route.post('auth','AuthController.auth')
      .as('auth')

Route.get('files/:id/download','FileController.download')
      .as('files.download')

Route.get('register','UserController.create')
      .as('signup')

Route.get('upload','FileController.create')
      .as('upload')

Route.post('share/:type/:id/email','ShareController.email')
      .as('share.email')

Route.resource('files','FileController')

Route.get('users/create',({ response}) => response.route('signup'))

Route.resource('posts','PostController')
      .middleware(new Map([
        [['create','store','edit','update','destroy'],['auth']],
        [['update','destroy','edit'],['own:post']]
      ]))

Route.resource('users','UserController')

Route.resource('tags','TagController')

Route.get('profiles/:id',async ({ params }) =>{
  const profile = await Profile.find(params.id)
  const user = await profile
    .user()
    .select('username')
    .fetch()

  return{
    profile,
    user
  }
  })
