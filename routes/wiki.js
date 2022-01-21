const express = require('express');

const wikiRouter = express.Router();
const { wikiPage } = require('../views')
const { main } = require('../views');
const { Page } = require("../models");
const { addPage } = require("../views");



wikiRouter.get('/', async (req, res, next) =>{
  const allPages = await Page.findAll({});
})

wikiRouter.get('/add', (req, res, next) => {
  res.send(addPage());
})

wikiRouter.get('/:slug', async (req, res, next) => {
  try{
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });

    res.send(wikiPage(page));
  }
  catch(error){
    next(error);
  }
})

wikiRouter.post('/', async (req, res, next) => {
 try{
   const {title, content} = req.body;
   const page = await Page.create({
     title: title,
     content: content,
   });
  res.redirect(`/wiki/${page.slug}`);

  }
  catch(error) { next(error) }
});


module.exports = {wikiRouter};
