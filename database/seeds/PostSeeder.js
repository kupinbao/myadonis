'use strict'

/*
|--------------------------------------------------------------------------
| PostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Post =  use ('App/Models/Post')

class PostSeeder {
  async run () {
    const posts = [
      {title:'吕名扬添加的数据',content:'这是名扬添加的数据',user_id:1},
      {title:'好好学习',content:'天天向上',user_id:1},
      {title:'学好计算机',content:'改变世界',user_id:1},
      {title:'王牧原添加的数据',content:'这是王牧原添加的数据',user_id:2},
      {title:'我是个记者',content:'报道真实的世界',user_id:2},
      {title:'我在这这里写报道',content:'这是个美好的世界',user_id:2},
    ]

    await Post.createMany(posts)
  }
}

module.exports = PostSeeder
