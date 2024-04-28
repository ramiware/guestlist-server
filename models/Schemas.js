const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/// Guests TABLE
const GuestsSchema = new Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Table: { type: String, required: true },
  Comment: { type: String, required: false },
  Confirmed: { type: Boolean, required: true },
  LastUpdated: { type: Date, required: true }
});

const Guests = mongoose.model('Guests', GuestsSchema, 'Guests');

const rwSchemas = {
  'Guests': Guests,
};

module.exports = rwSchemas;

