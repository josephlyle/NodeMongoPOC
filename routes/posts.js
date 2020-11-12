const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const mongoose = require('mongoose');

//Get all posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch{
        res.json({message: err});
    }
});

//Get post by id
router.get('/:postId', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch{
        res.json({message: err});
    }
});

//Post
router.post('/', async (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({ message: err });
    }
});

//Delete specific post
router.delete('/:postId', async (req,res) => {
    try{
        const removedPost = await Post.deleteOne({ _id: req.params.postId });
        res.json(removedPost);
    }catch{
        res.json({ message: err });
    }
});

//Update a post
router.patch('/:postId', async (req,res) =>{
    try{
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId }, 
            { $set: {title: req.body.title, description: req.body.description } },  
        );
        res.json(updatedPost);
    }catch{
        res.json({ message: err });
    }
});

module.exports = router;