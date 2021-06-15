var express = require('express');
var router = express.Router();

const Branch = require('../models/branch')

//get all branches
router.get('', async function (req, res, next) {
    try {
        const branches = await Branch.find({ "branch_name": { "$regex": req.query.q, "$options": "i" } })
        res.status(200).json(branches);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//new branch
router.post("/new", async function (req, res) {
    const branch = new Branch({
        branch_code: req.body.branch_code,
        branch_name: req.body.branch_name,
        address: req.body.address
    });

    try {
        const savedBranch = await branch.save();
        res.status(200).json({ message: "success", additional_info: "branch created" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//update branch
router.patch("/:id/update", async function (req, res) {
    try {
        updatedBranch = await Branch.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    branch_code: req.body.branch_code,
                    branch_name: req.body.branch_name,
                    address: req.body.address
                }
            },
            { runValidators: true }
        );

        res.status(200).json({ message: "success", additional_info: "branch updated" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//disable branch
router.patch("/:id/disable", async function (req, res) {
    try {
        updatedBranch = await Branch.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    disable: true
                }
            },
            { runValidators: true }
        );

        res.status(200).json({ message: "success", additional_info: "branch disabled" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//enable branch
router.patch("/:id/enable", async function (req, res) {
    try {
        updatedBranch = await Branch.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    disable: false
                }
            },
            { runValidators: true }
        );

        res.status(200).json({ message: "success", additional_info: "branch enabled" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//delete branch
router.delete("/:id/permanent_delete", async function (req, res) {
    try {
        const removedBranch = await Branch.remove({ _id: req.params.id });
        res.status(200).json({ message: "success", additional_info: "branch deleted" });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
