const express = require('express');
const app = express();
// this helps us make sure we are doing an absolute path
const path = require('path');
// UUID to generate IDs
const { v4: uuid } = require('uuid');
// overrides the method 
const methodOverride = require('method-override');

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())

app.use(methodOverride('_method'))
// add view engine/EJS to the application so that we can input data in a form and not just request via Postman
app.set('view engine', 'ejs')
// this helps us make sure we are doing an absolute path
app.set('views', path.join(__dirname, 'views'))

// we will "fake it" with an array since we don't have a database set up yet
let comments = [
  {
      id: uuid(),
      username: "Todd",
      comment: "LOL that is so funny"
  },
  {
      id: uuid(),
      username: "Alex",
      comment: "ROFL that is so ridiculous"
  },
  {
      id: uuid(),
      username: "Kate",
      comment: "WTH that is so silly"
  },
  {
      id: uuid(),
      username: "Sally",
      comment: "OMG that is so crazy"
  }
]

// get comments path, refer to index.ejs file via index argument, render comments with {comments}
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

// serves/renders a form/template for the comments
app.get('/comments/new', (req, res) => {
  res.render('comments/new')
})

// this is where the form submits its data to, pushing into the array (we will add a database later) - create a new comment
app.post('/comments', (req, res) => {
  // const username, comment are the fields we are going to push with req.body to the index.ejs body that holds the array
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() })
  // redirect back to the index.ejs to see the comments on the page
  res.redirect('/comments')
})

// get comment by id - show route - details around one particular comment by ID
app.get('/comments/:id', (req, res) => {
  // take the ID from the URL
  const { id } = req.params;
  // use array method FIND to find the correct comment in the comments array
  const comment = comments.find(c => c.id === id);
  // render the show comments page
  res.render('comments/show', { comment })
})

// route to serve up a form for EDIT path
app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params;
  const comment = comments.find(c => c.id === id);
  res.render('comments/edit', { comment })
})

// Update route - use PATCH
app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  // find comment by id
  const foundComment = comments.find(c => c.id === id);
  // taking whatever is sent in the request body (payload)
  const newCommentText = req.body.comment;
  // update that comment, its comment property, to whatever what was in that request comment body
  foundComment.comment = newCommentText;
  res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  // update the comments variable to be this new array based upon the old version of comments
  comments = comments.filter(c => c.id !== id);
  res.redirect('/comments')
})

// this will be an array for storing objects with pictures
// let pictures = [
//   {
//       id: uuid(),
//       username: "Sally",
//       picture: src="https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF.jpg"
//   }
// ]
// Name: Index, Path: /pictures, Verb: GET display all photos 
app.get('/pictures-index', (req, res) => {
  res.render('pictures/index'  /* grab picture from array with: { pictures } */)
})

// serve up the app on port 3000 - in terminal (in app directory) run -> nodemon app.js
app.listen(3000, () => {
  console.log("on port 3000")
})