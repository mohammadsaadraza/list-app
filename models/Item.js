const { mongo } = require("mongoose");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	term: {
		type: String,
		required: true,
	},
	lastModified: {
		type: Date,
		default: Date.now(),
	},
});

exports.itemSchema = itemSchema;

module.exports = mongoose.model("Item", itemSchema);
