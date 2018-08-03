'use strict'

const Helpers = use('Helpers')

const File = use('App/Models/File')

const filesize = use ('filesize')
/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   * Show a list of all files.
   * GET files
   */
  async index ({ request, response, view }) {
    const _files = await File.all()
    const files =_files.toJSON().map((file)=>{
      file.size = filesize(file.size)
      return file
    })

    return view.render('file.index',{files})

  }

  /**
   * Render a form to be used for creating a new file.
   * GET files/create
   */
  async create ({ request, response, view }) {
    return view.render('file.create')

  }

  /**
   * Create/save a new file.
   * POST files
   */
  async store ({ session, request, response }) {
    const file = request.file('file',{
      types:['image','video'],
      size:'20mb'
    })
    const fileName = `${new Date().getTime()}.${file.subtype}`

    await file.move(Helpers.publicPath('uploads'),{
      name:fileName
    })

    if(!file.moved()){
      const error = file.error()

      session.flash({
        type:'warning',
        message:`<small>${error.clientName}</small>:${error.message}`
      })
      return response.redirect('back')
    }

    await File.create({
      client_name:file.clientName,
      file_name:fileName,
      type:file.type,
      subtype:file.subtype,
      size:file.size
    })

      session.flash({
        type:'success',
        message:`<small>${file.clientName}</small>: 上传成功`
      })

      return response.redirect('back')
  }

  /**
   * Display a single file.
   * GET files/:id
   */
  async show ({ params, request, response, view }) {
    const file = await File.find(params.id)
    return view.render('file.show',{file:file.toJSON()})
  }

  /**
   * Render a form to update an existing file.
   * GET files/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update file details.
   * PUT or PATCH files/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a file with id.
   * DELETE files/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = FileController
