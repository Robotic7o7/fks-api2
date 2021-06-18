var express = require('express');
var router = express.Router();

const Post = require('../models/post')

//get all posts
router.get('', async function (req, res, next) {
    try{
        const posts= await Post.find().populate('user')
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//new post
router.post("/new", async function (req, res) {
    const post = new Post({
        user: req.body.user_id,
        post_text: req.body.post_text,
        date: Date.now()
    });

    try {
        const savedPost = await post.save();
        res.status(200).json({ message: "success", additional_info: "post created" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//update post
router.patch("/:id/update", async function (req, res) {
    try {
        updatedPost = await Post.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    post_text: req.body.post_text
                }
            },
            { runValidators: true }
        );

        res.status(200).json({ message: "success", additional_info: "password updated" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//disable post
router.patch("/:id/disable", async function (req, res) {
    try {
        updatedPost = await Post.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    disable: true
                }
            },
            { runValidators: true }
        );

        res.status(200).json({ message: "success", additional_info: "subject disabled" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//enable post
router.patch("/:id/enable", async function (req, res) {
    try {
        updatedPost = await Post.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    disable: false
                }
            },
            { runValidators: true }
        );

        res.status(200).json({ message: "success", additional_info: "subject enabled" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//delete post
router.delete("/:id/permanent_delete", async function (req, res) {
    try {
        const removedPost = await Post.remove({ _id: req.params.id });
        res.status(200).json({ message: "success", additional_info: "subject deleted" });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
