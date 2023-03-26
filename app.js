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
app.get('/beers', async (req, res) => {
  
  try{
    const response = await fetch('https://api.punkapi.com/v2/beers');
    const beers = await response.json();
    res.render('beers', {beers});
    console.log(beers);
  }
  catch (err) {
    console.log(err);
    res.render('error')
  }
});

// const beers = fetch("https://api.punkapi.com/v2/beers")
// punkAPI.getBeers()
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// })


  // const beers1 = punkAPI
  // .getBeers({'abv_gt': 8})
  // .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
  // .catch(error => console.log(error));
  // const data = {
  //   beers: beers
  // }
  // res.render('beers', getData);
  // console.log("The data is.......");

  // punkAPI.getBeers('burger')
  // .then((beerArr) => {
  //   const data = {
  //     beers: beerArr
  //   }
  //   res.render('beers', data);
  //   console.log("data");
  // })
  // .catch(err => console.log('error'));

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

// asyncCall()


// async function strongBeer () {
//   const strongBeers = await punkAPI.getBeers({'id: 8'})
//   console.log(strongBeers);
// }

// strongBeer();