const faker = require('faker')
faker.locale = 'pt_BR'

const Poster = require('../models/poster')

const setup = {
  init: function (req, res, next) {
    let starterPosters = []
    const totalPosters = 50

    for (let i = 0; i < totalPosters; i++) {
      starterPosters.push(new Poster({
        phone: faker.phone.phoneNumber(),
        username: faker.internet.userName(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        posts: [],
        subscriptions: [],
        timestamp: faker.date.recent()
      }))
    }

    starterPosters.forEach((poster, index) => {
      const nPosts = faker.random.number(100)
      for (let i = 0; i < nPosts; i++) {
        poster.posts.push({
          title: faker.lorem.words(),
          body: faker.lorem.paragraph(),
          timestamp: faker.date.recent()
        })
      }
      poster.posts.sort((a, b) => a.timestamp - b.timestamp)

      const nSubs = faker.random.number(30)
      for (let i = 0; i < nSubs; i++) {
        const idxSub = faker.random.number(totalPosters - 1)
        const sub = starterPosters[idxSub]
        if (sub !== poster && poster.subscriptions.findIndex(ss => ss._id === sub._id) === -1) {
          poster.subscriptions.push(sub)
        }
      }
    })

    console.log('start insert')

    Poster.insertMany(starterPosters)
      .then(posters => {
        console.log('insert success')
        res.send(posters.slice(0, 5))
      })
      .catch(err => res.send('Fail: ' + JSON.stringify(err)))
  }
}

module.exports = setup
