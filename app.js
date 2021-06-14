const express = require('express');
const app = express();
// this helps us make sure we are doing an absolute path
const path = require('path');
// UUID to generate IDs
const { v4: uuid } = require('uuid');

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())

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
    res.render('comments/index', { comments });
})

// serves/renders a form/template for the comments
app.get('/comments/new', (req, res) => {
  res.render('comments/new');
})

// this is where the form submits its data to, pushing into the array (we will add a database later) - create a new comment
app.post('/comments', (req, res) => {
  // const username, comment are the fields we are going to push with req.body to the index.ejs body that holds the array
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() })
  // redirect back to the index.ejs to see the comments on the page
  res.redirect('/comments');
})

// get comment by id - show route - details around one particular comment by ID
app.get('/comments/:id', (req, res) => {
  // take the ID from the URL
  const { id } = req.params;
  // use array method FIND to find the correct comment in the comments array
  // add parseInt to parse the string returned (the user ID will be returned as a string) int a number
  const comment = comments.find(c => c.id === id);
  // render the show comments page
  res.render('comments/show', { comment });
})

// serve up the app on port 3000 - in terminal (in app directory) run -> nodemon app.js
app.listen(3000, () => {
  console.log("on port 3000")
}) 

// GET /comments - list all comments
// POST /comments - Create a new comment 
// GET /comments/:id - Get one comment (using ID)
// PATCH /comments/:id - Update one comment
// DELETE /comments/:id - Destroy one comment