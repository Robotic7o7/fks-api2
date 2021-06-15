const mongoose = require('mongoose')

const classSchema = mongoose.Schema({
    class_name: {
        type: String
    },

    subjects: [{
        subject: {
            type: mongoose.Schema.Types.ObjectId
        }
    }],
    
    disable: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('Class', classSchema)