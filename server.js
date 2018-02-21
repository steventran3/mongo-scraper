const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const request = require("request");
const path = require('path')
// Our scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

const PORT = 3000;

// Initialize Express
const app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoScraperHw");

//HTML Routes
app.get('/', (req,res) => res.sendFile(path.join(__dirname, './public/index.html')))
app.get('/saved', (req,res) => res.sendFile(path.join(__dirname, './public/saved.html')))

//Routes
app.get("/scrape", (req, res) => {
  request("https://www.macrumors.com/", (error, response, html) => {
    // Load the body of the HTML into cheerio
    var $ = cheerio.load(html);

    // Empty array to save our scraped data
    var results = [];

    // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
    $("h2").each((i, element) => {
      // Save the text of the h4-tag as "title"
      var title = $(element).text();

      var link = $(element).attr("href");

      results.push({
        title: title,
        link: link
      });
    });

    db.Article.create(results)
        .then(dbArticle => res.json(result))
        .catch(err => res.json(err))
  })
});

app.get("/articles", (req, res) => {
   
    db.Article.find({})
      .then(function(dbArticle) {
       
        res.json(dbArticle);
      })
      .catch(function(err) { 
        
        res.json(err);
      });
  });

app.get("/saved/articles", (req, res) => {
   
    db.Save.find({})
      .then(function(dbArticle) {
       
        res.json(dbArticle);
      })
      .catch(function(err) { 
        
        res.json(err);
      });
  });

app.post('/articles/:id', (req,res) =>{
  db.Article.findOne({_id: req.params.id})
  .then(dbArticle => {
    console.log(dbArticle)
    db.Save.create({title:dbArticle.title})
  })
  .catch(err => {
    res.json(err)
  })
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
