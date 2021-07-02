var express = require('express');
var router = express.Router();

//import models
const Assignment = require('../models/assignment')
const StudentSubmittedAssignment = require('../models/student_submitted_assignment')



//file upload
const AWS = require('aws-sdk')
var multer = require('multer')
var path = require('path')


//multer
var storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
})

var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    } 
 });

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})


//filename generator
function generateFileName() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


router.post('/upload_assignment_img', upload.single('file'), async function (req, res) {
    try {
        var uploadedFiles = req.file;
        console.log(req.file);
        var newfilename = uploadedFiles.originalname;
        var buffer = uploadedFiles.buffer;
        var myFile = newfilename.split('.')
        const fileType = myFile[myFile.length - 1]

            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${generateFileName()}.${fileType}`,
                Body: buffer
            }
            const uploaded = await s3.upload(params).promise()

            res.status(200).json({ message: "success", images: uploaded.key, uploadInfo: uploaded, additional_info: "assignment image uploaded" })


    } catch (err) {
        res.status(500).json(err)
        console.log(err);
    }
})



//add spare part img
router.post('/:id/upload_img',async function (req, res) {
    try {
        var student_id = req.body.student_id;
        var assignment_id=req.params.id;
        var fileURL = req.body.fileURL
        const assignment = await Assignment.findById({ _id: req.params.id })

            const submission = new StudentSubmittedAssignment({
                student_id:student_id,
                assignment_id:assignment_id,
                fileURL: fileURL
            });
        
        
            const savedSubmission = await submission.save();

            res.status(200).json({ message: "success", images: uploaded.key, additional_info: "assignment image uploaded" })

    } catch (err) {
        res.status(500).json(err)
    }
})


//export
module.exports = router;