const Poster = require('../models/poster')

const api = {
  // Criar Poster
  createPoster: function (req, res, next) {
    const { phone, username, firstname, lastname, bio } = req.body
    const poster = new Poster({
      phone,
      username,
      firstname,
      lastname,
      bio,
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
    const { phone, username, firstname, lastname, bio } = req.body
    const updated = { phone, username, firstname, lastname, bio }
    Poster.findByIdAndUpdate(req.params.id, updated) // Retorna o objeto antes da modificação
      .then(obj => res.send(obj))
      .catch(next)
  },

  // Apaga conta do Poster :id
  deletePoster: function (req, res, next) {
    Poster.findByIdAndRemove(req.params.id) // Retorna o objeto antes de remover
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

  // Busca :query pelo Poster
  searchPoster: function (req, res, next) {
    const query = JSON.parse(req.params.query)
    Poster.find(query)
      .then(obj => res.send(obj))
      .catch(next)
  },

  // Encontra todas as inscrições do Poster :id
  getSubscriptions: function (req, res, next) {
    Poster.findById(req.params.id, 'subscriptions')
      .then(obj => res.send(obj))
      .catch(next)
  },

  // Inscreve Poster :id no Poster :sub
  subscribe: function (req, res, next) {
    Poster.findById(req.params.sub)
      .then(sub => {
        Poster.findById(req.params.id)
          .then(poster => {
            if (poster.subscriptions.indexOf(sub._id) === -1) {
              poster.subscriptions.push(sub)
              return poster.save()
            }
            return poster
          })
          .then(obj => res.send(obj))
          .catch(next)
      })
      .catch(next)
  },

  // Desinscreve Poster :id do Poster :sub
  unsubscribe: function (req, res, next) {
    Poster.findById(req.params.id)
      .then(poster => {
        const index = poster.subscriptions.indexOf(req.params.sub)
        if (index !== -1) {
          console.log('found')
          poster.subscriptions.splice(index, 1)
          console.log(poster.subscriptions)
          return poster.save()
        }
        return poster
      })
      .then(obj => res.send(obj))
      .catch(next)
  },

  // Faz uma postagem do Poster :id
  createPost: function (req, res, next) {
    const { title, body } = req.body
    Poster.findById(req.params.id)
      .then(obj => {
        obj.posts.push({ title, body })
        return obj.save()
      })
      .then(obj => res.send(obj))
      .catch(next)
  },

  // Carrega um post :post do Poster :id
  readPost: function (req, res, next) {
    Poster.findById(req.params.id)
      .then(obj => res.send(obj.posts.id(req.params.post)))
      .catch(next)
  },

  // Atualiza um post :post do Poster :id
  updatePost: function (req, res, next) {
    const { title, body } = req.body
    Poster.findById(req.params.id)
      .then(obj => {
        let post = obj.posts.id(req.params.post)
        post.title = title
        post.body = body
        post.timestamp = Date.now()
        // return post.save()
        return obj.save()
      })
      // .then(obj => res.send(obj))
      .then(obj => res.send(obj.posts.id(req.params.post)))
      .catch(next)
  },

  // Apaga um post :post do Poster :id
  deletePost: function (req, res, next) {
    Poster.findById(req.params.id)
      .then(obj => {
        obj.posts.splice(obj.posts.indexOf(obj.posts.id(req.params.post)), 1)
        return obj.save()
      })
      .then(obj => res.send(obj))
      .catch(next)
  },

  // Carrega todos os posts não sincronizados das inscrições do Poster :id
  syncPosts: function (req, res, next) {
    Poster.findById(req.params.id, 'subscriptions timestamp')
      .then(obj => {
        const timestamp = new Date(obj.timestamp)
        obj.timestamp = Date.now()
        obj.save()
          .then(obj => console.log('Updated timestamp: ' + obj.timestamp))
          .catch(next)
        return Poster.find({ _id: { $in: obj.subscriptions }, timestamp: { $gte: timestamp } }, 'username posts')
      })
      .then(obj => res.send(obj))
      .catch(next)
  },

  // Carrega todos os posts das inscrições do Poster :id
  getAllPosts: function (req, res, next) {
    Poster.findById(req.params.id, 'subscriptions')
      .then(({ subscriptions }) => {
        return Poster.find({ _id: { $in: subscriptions } }, 'username posts')
      })
      .then(users => {
        let posts = []
        users.forEach(user => user.posts.forEach(post => {
          posts.push({
            username: user.username,
            title: post.title,
            body: post.body,
            timestamp: post.timestamp
          })
        }))
        posts.sort((a, b) => a.timestamp - b.timestamp)
        return posts
      })
      .then(posts => res.send(posts))
      .catch(next)
  }
}

module.exports = api
