const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('images'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers shere:s

//home handler
app.get('/', (req, res) => {
  res.render('index', {imageUrl: '/images/beer.png'});
});

//beers page handler
app.get('/beers', (req, res) => {
  punkAPI.getBeers('burger')
  .then((beerArr) => {
    const data = {
      beers: beerArr
    }
    res.render('beers', data);
    console.log("data");
  })
  .catch(err => console.log('error'));
});

//random-beer page handler
app.get('/random-beer', (req, res) => {
  res.render('random-beer')
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));

// console.log(await punkAPI.getBeers('pizza'));

// const thing = await punkAPI.getBeers('pizza');
// console.log(thing);
async function asyncCall() {
  const thing = await punkAPI.getBeers({'abv_gt': 8});
  console.log(thing);
}

asyncCall()
