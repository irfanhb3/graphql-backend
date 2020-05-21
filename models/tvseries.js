const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tvSeriesSchema = new Schema({
	name: String,
	genre: String,
	directorId: String
});

module.exports = mongoose.model('TvSeries', tvSeriesSchema);