const express = require('express');
const postsRouter = express.Router();
const { getAllPosts, createPost } = require('../db');
const { requireUser } = require('./utils');


postsRouter.use((req, res, next) => {
    console.log("A request is being made to /posts");
  
    next()
  });
 
 
  postsRouter.post('/', requireUser, async (req, res, next) => {
    const { title, content, tags = "" } = req.body;
  
    const tagArr = tags.trim().split(/\s+/)
    const postData = {};
  
    // only send the tags if there are some to send
    if (tagArr.length) {
      postData.tags = tagArr;
    }
  
    try {
      postData.title = title
      postData.content = content
      postData.authorId = req.user.id
      
      const post = await createPost(postData);
      if(post) {
        res.send({post});
      } 
      else {
        next({
          name: 'Error creating post',
          message: 'Can not create post try again'
        })
      }
      
    } catch ({ name, message }) {
      next({ name, message });
    }
  });
  
  
  postsRouter.get('/', async (reg, res) => {
    const posts = await getAllPosts();

    res.send({
        "posts":posts
    });
  });

  module.exports = postsRouter;