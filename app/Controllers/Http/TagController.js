'use strict'

const Tag = use ('App/Models/Tag')
/**
 * Resourceful controller for interacting with tags
 */
class TagController {
  /**
   * Show a list of all tags.
   * GET tags
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new tag.
   * GET tags/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new tag.
   * POST tags
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single tag.
   * GET tags/:id
   */
  async show ({ params, request, response, view }) {
    const tag = await Tag.find(params.id)
    const posts = await tag
      .posts()
      .select('id','title','content')
      .fetch()

    return view.render('tag.show',{tag,posts:posts.toJSON()})
  }

  /**
   * Render a form to update an existing tag.
   * GET tags/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update tag details.
   * PUT or PATCH tags/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a tag with id.
   * DELETE tags/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = TagController
