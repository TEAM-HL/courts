const router = require('express').Router()
let Post = require('../models/post')

router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(e => res.status(400).json('Error: ' + e))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const category = req.body.category
    const title = req.body.title
    const content = req.body.content
    const origin = req.body.origin

    const newPost = new Post({username, category, title, content, origin})

    newPost.save()
        .then(() => res.json('Post added'))
        .catch(e => res.status(400).json('Error: ' + e))
})

router.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(e => res.status(400).json('Error: ' + e))
})

router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted'))
        .catch(e => res.status(400).json('Error: ' + e))
})

router.route('/update/:id').post((req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.username = req.body.username
            post.category = req.body.category
            post.title = req.body.title
            post.content = req.body.content
            post.origin = req.body.origin

            post.save()
                .then(() => res.json('Post updated'))
                .catch(e => res.status(400).json('Error: ' + e))
        })
        .catch(e => res.status(400).json('Error: ' + e))
})

module.exports = router