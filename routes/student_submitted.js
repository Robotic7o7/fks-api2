var express = require('express');
var router = express.Router();

const StudentSubmissions = require('../models/student_submitted_assignment')

//all submissions
router.get('/', async function (req, res, next) {
    try{
        const submissions= await StudentSubmissions.find()
        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//submissions by assignment ID
router.get('', async function (req, res, next) {
    try{
        const submissions= await StudentSubmissions.find({ "assignment_id": { "$regex": req.query.q, "$options": "i" }})
        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//submissions by student ID

router.get('/student/:id', async function (req, res, next) {
    try{
        const submissions= await StudentSubmissions.find({ "student_id": { "$regex": req.query.q, "$options": "i" }, "student_id":req.params.id})
        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


//submissions by assignment ID

router.get('/assignment/:id', async function (req, res, next) {
    try{
        const submissions= await StudentSubmissions.find({ "assignment_id": { "$regex": req.query.q, "$options": "i" }, "assignment_id":req.params.id})
        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;