const express = require('express')
const bodyParser = require('body-parser')

const api = require('../controllers/apiController')

const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// Criar Poster
router.post('/poster', api.createPoster)

// Carregar informações do Poster :id
router.get('/poster/:id', api.readPoster)

// Atualizar informações do Poster :id
router.put('/poster/:id', api.updatePoster)

// Apaga conta do Poster :id
router.delete('/poster/:id', api.deletePoster)

// Encontra todas as inscrições do Poster :id
router.get('/poster/:id/subs', api.getSubscriptions)

// Encontra últimos :total posts do Poster :id. 'all' encontra todos.
router.get('/poster/:id/posts/:total', api.getPosterPosts)

// Faz uma postagem do Poster :id
router.post('/posts/:id', api.createPost)

// Carrega um post :post do Poster :id
router.get('/posts/:id/:post', api.readPost)

// Atualiza um post :post do Poster :id
router.put('/posts/:id/:post', api.updatePost)

// Apaga um post :post do Poster :id
router.delete('/posts/:id/:post', api.deletePost)

// Carrega todos os posts não sincronizados das inscrições do Poster :id
router.get('posts/sync/:id', api.syncPosts)

// Carrega todos os posts das inscrições do Poster :id
router.get('posts/subs/:id', api.getAllPosts)

module.exports = router
