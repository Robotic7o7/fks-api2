const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    date:{
        type:Date
    },
    
    post_text:{
        type:String
    },
    
    disable:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model('Post', postSchema)