const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
// const randomBeer = punkAPI.getRandom();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('images'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

//home handler
app.get('/', (req, res) => {
  res.render('index', {imageUrl: '/images/beer.png'});
});

//beers page handler
//call back func is async
app.get('/beers', async (req, res) => {
  
  try{
    //recieve a promise, so we need to use await
    const response = await fetch('https://api.punkapi.com/v2/beers');
    //gives us a json object
    const beers = await response.json();
    //renders the page, calling the beers object
    res.render('beers', {beers});
    // console.log(beers);
  }
  catch (err) {
    console.log(err);
    res.render('error')
  }
});

//random-beer page handler
//same thing, async callback function
app.get('/random-beer', async (req, res) => {

  try{
    //await the api data again
    const response = await fetch('https://api.punkapi.com/v2/beers')
    await response.json();
    
    //create a var of the get random method
    const randomBeer = await punkAPI.getRandom()

    //render page with the random beer obj
    res.render('random-beer', {randomBeer});
    // console.log(randomBeer[0].name);
  }
  catch(err){
    console.log(err);
    res.render(err)
  }
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));

