const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');


tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");

    next(); // THIS IS DIFFERENT
});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();

    res.send({
        "tags":tags
    });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    // read the tagname from the params
    const { tagName } = req.params;
    try {
      const getPost  = await getPostsByTagName(tagName)
      // use our method to get posts by tag name from the db
      const posts = getPost.filter(post => {
        return post.active || (req.user && post.author.id === req.user.id);
      });
     if(posts.length) {
      res.send({posts})
     } else {
       next({
         name: 'UnauthorizedTagError',
         message: "You cannot get posts by tag name"
       })
     }
      // send out an object to the client { posts: // the posts }
    } catch ({ name, message }) {
      // forward the name and message to the error handler
        next({ name, message })
    } 
  });

module.exports = tagsRouter;