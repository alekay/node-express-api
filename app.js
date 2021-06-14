const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// this helps us make sure we are doing an absolute path
const path = require('path')



app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json

// add view engine/EJS to the application so that we can input data in a form and not just request via Postman
app.set('view engine', 'ejs')
// this helps us make sure we are doing an absolute path
app.set('views', path.join(__dirname, 'views'))

// we will "fake it" with an array since we don't have a database set up yet
const comments = [
  {
      username: "Todd",
      comment: "LOL that is so funny"
  },
  {
      username: "Alex",
      comment: "ROFL that is so ridiculous"
  },
  {
      username: "Kate",
      comment: "WTH that is so silly"
  },
  {
      username: "Sally",
      comment: "OMG that is so crazy"
  },
]

// get comments path, refer to index.ejs file via index argument, render comments with {comments}
app.get('/comments', (req, res) => {
    res.render('comments/index', {comments})
})

// serves/renders a form/template for the comments
app.get('/comments/new', (req, res) => {
  res.render('comments/new')
})

// this is where the form submits its data to, pushing into the array (we will add a database later)
app.post('/comments', (req, res) => {
  // const username, comment are the fields we are going to push with req.body to the index.ejs body that holds the array
  const {username, comment} = req.body;
  comments.push({username, comment})
  // redirect back to the index.ejs to see the comments on the page
  res.redirect('/comments')
})

// app.get('/tacos', (req, res) => {
//   res.send("GET /tacos response")
// })

// // post route
// app.post('/tacos', (req, res) => {
//   // This establishes the request objects we are going to send in the request body (req.body)
//   const {meat, qty} = req.body;
//   // this is the response that will be returned on the page body based on our input on the FORM
//   res.send(`OK here are your ${qty} ${meat} tacos`)
// })

// serve up the app on port 3000 - in terminal (in app directory) run -> nodemon app.js
app.listen(3000, () => {
  console.log("on port 3000")
}) 

