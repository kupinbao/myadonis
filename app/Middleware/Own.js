'use strict'

const Post = use('App/Models/Post')


class Own {
  async handle ({ request,session,params,response,auth }, next,args) {

    // console.log("hello 中间件")
    // console.log('args:',args)

    const entityType=args[0]
    let entity={}

    if(entityType === 'post'){
      entity = await Post.find(params.id)
    }

    const own = entity.user_id === auth.user.id

    if(!own && auth.user.id !==1) {
      session
        .flash({
          type:'danger',
          message:'你没有编辑的权限'
        })
        await session.commit()

        return response.redirect('back')
    }

    await next()
  }
}

module.exports = Own
