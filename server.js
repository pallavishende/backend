var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()
var jwt = require('jwt-simple')

var User = require('./models/User.js')
var Product = require('./models/Products.js')
var Post = require('./models/Post.js')
var auth = require('./auth.js')

mongoose.Promise = Promise

app.use(cors())
app.use(bodyParser.json())

app.get('/posts/:id', async (req, res) => {
    var author = req.params.id
    var posts = await Post.find({ author })
    res.send(posts)
})

app.post('/post', auth.checkAuthenticated, (req, res) => {
    var postData = req.body
    postData.author = req.userId

    var post = new Post(postData)

    post.save((err, result) => {
        if (err) {
            console.error('saving post error')
            return res.status(500).send({ message: 'saving post error' })
        }

        res.sendStatus(200)
    })
})


app.post('/product', (req, res) => {
    var postData = req.body
    //postData.author = req.userId

    var product = new Product(postData)

    product.save((err, result) => {
        if (err) {
            console.error('saving product error')
            return res.status(500).send({ message: 'saving product error' })
        }

        res.sendStatus(200)
    })
})

app.get('/products', async (req, res) => {
    try {
      console.log('req.body' + req.body)
      var products = await Product.find({}, '-__v')
      res.send(products).status(200)

    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        console.log('req.body' + req.params.id)
        //var author = req.params.id
        var product = await Product.findById(req.params.id)
        //var product = await Product.findById(req.params.id)
        res.send(product)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})



app.get('/users', async (req, res) => {
    try {
        var users = await User.find({}, '-pwd -__v')
        res.send(users)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

app.get('/profile/:id', async (req, res) => {
  try {
        var user = await Product.findById(req.params.id, '-pwd -__v')
        res.send(user)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

mongoose.connect('mongodb://test:pramod76@ds121189.mlab.com:21189/product-catalog', { useMongoClient: true }, (err) => {
    if (!err)
        console.log('connected to mongo')
})

app.use('/auth', auth.router)
app.listen(process.env.PORT || 3000)
