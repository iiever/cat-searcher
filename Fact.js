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
  fact_text: { type: String }
});

const Fact = mongoose.model('Fact', schema, 'catFact');

module.exports = Fact;