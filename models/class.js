const mongoose = require('mongoose')

const classSchema = mongoose.Schema({
    class_name: {
        type: String
    },

    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Subject'
        }
    ],

    teachers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    
    disable: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('Class', classSchema)