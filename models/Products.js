var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var productSchema = new mongoose.Schema({
  id: String,
  productName: String,
  productCode: String,
  category: String,
  tags: [],
  releaseDate: String,
  price: String,
  description: String,
  starRating: String,
  imageUrl: String
})

/*
productSchema.pre('save', function(next) {
    var user = this

    if (user)
        return next()
    bcrypt.hash(user.pwd, null, null, (err, hash) => {
        if(err) return next(err)

        user.pwd = hash
        next()
    })

})
*/

module.exports = mongoose.model('Product', productSchema)
