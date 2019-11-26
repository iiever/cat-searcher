const mongoose = require('mongoose');
const db = 'mongodb+srv://ever:everhong12@cluster0-qp5pg.mongodb.net/Cat?retryWrites=true&w=majority';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  id: { type: String },
  name: { type: String },
  origin: { type: String },
  description: { type: String},
  life_span: { type: String },
  alt_names: { type: String },
  wikipedia_url: { type: String },
  url: { type: String }
});

const Cat = mongoose.model('Cat', schema, 'searchCat');

module.exports = Cat;