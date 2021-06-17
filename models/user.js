const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    
    admission_number:{
        type:String
    },

    profile_picture:{
        type:String
    },

    date_of_birth:{
        type:String
    },

    gender:{
        type:String
    },

    blood_group:{
        type:String
    },

    email:{
        type:String
    },

    phone_number:{
        type:String
    },
    
    class:{
        type: mongoose.Schema.Types.ObjectId
    },

    branch:{
        type: mongoose.Schema.Types.ObjectId
    },
    
    address:{
        type:String
    },

    year_of_joining:{
        type:String
    },

    class_of_joining:{
        type:String
    },

    password: {
        type: String,
    },

    job_industry:{
        type:String
    },
    
    job_description:{
        type:String
    },

    office_address:{
        type:String
    },

    office_phone_number:{
        type:String
    },

    relationship:{
        type:String
    },

    short_desc:{
        type:String
    },

    access:[{
        type:String
    }],

    user_type:{
        type:String
    }

})

module.exports = mongoose.model('User', userSchema)