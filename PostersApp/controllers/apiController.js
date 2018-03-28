const Poster = require('../models/poster')

const api = {
  // Criar Poster
  createPoster: function (req, res, next) {
    const { phone, username, firstname, lastname } = req.body
    const poster = new Poster({
      phone,
      username,
      firstname,
      lastname,
      posts: [],
      subscriptions: [],
      timestamp: Date.now()
    })
    poster.save()
      .then(obj => res.send(obj))
      .catch(next)
  },

  // Carregar informações do Poster :id
  readPoster: function (req, res, next) {
    Poster.findById(req.params.id)
      .then(obj => res.send(obj))
      .catch(next)
  },

  // Atualizar informações do Poster :id
  updatePoster: function (req, res, next) {
    Poster.findByIdAndUpdate(req.params.id, req.body) // Retorna o objeto antes da modificação
      .then(obj => res.send(obj))
      .catch(next)
  },

  // Apaga conta do Poster :id
  deletePoster: function (req, res, next) {
    Poster.findByIdAndRemove(req.params.id) // Retorna o objeto antes de remover
      .then(obj => res.send(obj))
      .catch(next)
  },

  // Encontra todas as inscrições do Poster :id
  getSubscriptions: function (req, res, next) {
    Poster.findById(req.params.id, 'subscriptions')
      .then(obj => res.send(obj))
      .catch(next)
  },

  // Encontra últimos :total posts do Poster :id. '0' encontra todos.
  getPosterPosts: function (req, res, next) {
    Poster.findById(req.params.id, 'posts')
      .then(obj => {
        let total = Number(req.params.total)
        if (total) {
          if (total < obj.posts.length) {
            obj.posts = obj.posts.slice(obj.posts.length - total)
          }
        }
        res.send(obj)
      })
      .catch(next)
  },

  // Faz uma postagem do Poster :id
  createPost: function (req, res, next) {
    Poster.findById(req.params.id)
      .then(obj => {
        obj.posts.push(req.body)
        return obj.save()
      })
      .then(obj => res.send(obj))
      .catch(next)
  },

  // Carrega um post :id
  readPost: function (req, res, next) {
    Poster.aggregate()
      .match({ })
      .then(obj => res.send(obj))
      .catch(next)
    /* Poster.aggregate([
      { $match: { _id: req.params.id } }
    ])
      .then(obj => res.send(obj))
      .catch(next) */
    /* find({ 'posts': { '$elemMatch': { '_id': req.params.post } } })
      .then(obj => res.send(obj))
      .catch(next) */
  },

  // Atualiza um post :id
  updatePost: function (req, res, next) {
  },

  // Apaga um post :id
  deletePost: function (req, res, next) {
  },

  // Carrega todos os posts não sincronizados das inscrições do Poster :id
  syncPosts: function (req, res, next) {
  },

  // Carrega todos os posts das inscrições do Poster :id
  getAllPosts: function (req, res, next) {
  }
}

module.exports = api
