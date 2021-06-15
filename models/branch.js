const mongoose = require('mongoose')

const branchSchema = mongoose.Schema({
    
    branch_code:{
        type:String
    },
    
    branch_name:{
        type:String
    },
    
    address:{
        type:String
    },
    
    disable:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model('Branch', branchSchema)