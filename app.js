const express = require('express');
const app = express();
const axios = require('axios');
const Cat = require('./Cat');

const Fact = require('./Fact');



const apikey = 'b9da57e8';

//localhost:5000/getcat?id=CatTitle
app.get('/getcat', (req, res) => {
  const id = req.query.id;
  const querystr = `https://api.thecatapi.com/v1/images/search?breed_ids=${id}`;
  

  axios
    .get(querystr)
    .then(response => {
      const cat = new Cat({
        id: response.data[0].breeds[0].id,
        name: response.data[0].breeds[0].name,
        description: response.data[0].breeds[0].description,
        origin: response.data[0].breeds[0].origin,
        life_span: response.data[0].breeds[0].life_span,
        alt_names: response.data[0].breeds[0].alt_names,
        wikipedia_url: response.data[0].breeds[0].wikipedia_url,
        url: response.data[0].url
      });
      if (!cat.id) {
        res.status(200).json('Not found');
        return;
      }
      cat
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/getallcats
app.get('/getallcats', (req, res) => {
  Cat.find({})
    .sort([['_id', -1]])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/deletecat?id=CatTitle
app.get('/deletecat', (req, res) => {
  Cat.deleteMany({ id: req.query.id })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.get('/factpopup', (req, res) => {
  var queryStr = `https://cat-fact.herokuapp.com/facts/random`;
  axios.get(queryStr).then(response1 => {
    console.log(response1.data.text);
    res.status(200).json(response1.data.text);
  })
})

app.listen(5000, () => {
  console.log('server listening on port 5000');
});
