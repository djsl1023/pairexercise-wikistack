const express = require('express');

const wikiRouter = express.Router();

const { Page } = require("../models");
const { addPage } = require("../views");

function generateSlug(title) {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}


wikiRouter.get('/', (req, res, next) =>{
  res.send('got to GET /wiki/')
})

wikiRouter.get('/add', (req, res, next) => {
  res.send(addpage());
})

wikiRouter.post('/', (req, res, next) => {
 try{
   const {title, content} = req.body;
   const page = await Page.create({
     title: title,
     content: content,
   });
  res.redirect('/');
 } catch(error) { next(error) }

});


module.exports = {wikiRouter};
