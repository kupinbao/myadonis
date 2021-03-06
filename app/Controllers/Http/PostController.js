'use strict'

const Database = use ('Database')
const Post = use('App/Models/Post')
const User = use('App/Models/User')
const Tag = use('App/Models/Tag')
const { validateAll } = use('Validator')
const Route = use('Route')

class PostController {

  async index ({ request, response, view }) {
    const posts = await Post
      .query()
      .with('user',(builder)=>{
        builder.select('id','username')
      })
      .with('user.profile')
      .fetch()

    console.log(posts.toJSON())
    return view.render('post.index',{posts:posts.toJSON()})
  }


  async create ({ request, response, view }) {
    const users = await User.all()
    const tags = await Tag.all()
    return view.render('post.create',{users:users.toJSON(),tags:tags.toJSON()})
    //渲染页面
  }


  async store ({ request, response, session }) {
    const rules = {
      title:'required',
      content:'required'
    }

    const validation = await validateAll(request.all(),rules)

    if (validation.fails()){
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    const newPost = request.only(['title','content'])//请求得到数据
    const tags = request.input('tags')
    // const postID = await Database.insert(newPost).into('posts')
    //Database.insert插入const 定义的数据  into（'数据表'）需要插入的数据表
    const user = await User.find(request.input('user_id'))
    const post = await user
      .posts()
      .create(newPost)

    await post
      .tags()
      .attach(tags)

    return response.redirect(`/posts/${post.id}`)//重定向渲染视图

  }

  /**
   * Display a single post.
   * GET posts/:id
   * 显示数据库内容
   */
  async show ({ params, request, response, view }) {
      // const post = await Database //定义一个常量 ,等待数据库处理
      //   .from ('posts')//查询 数据库里面的posts表
      //   .where('id',params.id)//查询 的条件是根据数据表里面的ID查询
      //   .first()//获取查询到的内容
      const post = await Post.findOrFail(params.id)

      const tags = await post
        .tags()
        .select('id','title')
        .fetch()

      return view.render('post.show',{post,tags:tags.toJSON()})
      //返回一个 渲染视图，选软视图所带有的值是使用post的show方法。
  }


  async edit ({ params, request, response, view }) {
    // const post = await Database //定义一个常量 ,等待数据库处理
    //   .from ('posts')//查询 数据库里面的posts表
    //   .where('id',params.id)//查询 的条件是根据数据表里面的ID查询
    //   .first()//获取查询到的内容
    //
    // return view.render('post.edit',{post})
    //返回一个 渲染视图，选软视图所带有的值是使用post的edit方法。
    const _post = await Post.findOrFail(params.id)

    const _users = await User.all()
    const users = _users.toJSON()
    const _tags = await Tag.all()
    const tags = _tags.toJSON()
    await _post.load('tags')
    const post = _post.toJSON()
    const postTagIds = post.tags.map(tag => tag.id)

    const tagItems = tags.map((tag)=>{
      if(postTagIds.includes(tag.id)){
        tag.checked = true
      }
      return tag
    })

    const userItems = users.map((user) => {
          if (user.id === post.user_id) {
            user.checked = true
          }

          return user
        })

    return view.render('post.edit',{
      post,
      users:userItems,
      tags:tagItems
    })
  }


  async update ({ params, request,session, response }) {
    const {title, content, user_id, tags}=request.all()


    const post = await Post.findOrFail(params.id)
    post.merge({title,content})
    await post.save()

    const user = await User.find(user_id)
    await post.user().associate(user)

    await post.tags().sync(tags)

    session.flash({
      type:'primary',
      message:`Post updated.<a href="${ Route.url('PostController.show',{id:post.id})}" class="alert-link">Preview post.</a>`

    })
    return response.redirect('back')
  }

  /**
   * Delete a post with id.
   * DELETE posts/:i
   * 删除数据库内容需要用的
   */
  async destroy ({ params, request, response }) {
    // await Database
    //   .table('posts')
    //   .where('id',params.id)
    //   .delete()
    // 删除posts 数据
    // return 'success'
    const post = await Post.find(params.id)

    try{
      await post.tags().detach()
    //删除文章与标签的关系
      await post.delete()
    } catch (error) {
      console.log(error)
    }

    return 'success'
  }

}

module.exports = PostController
