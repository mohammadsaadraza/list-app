const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { itemSchema } = require("./Item");

const listSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	items: {
		type: [itemSchema],
	},
});

module.exports = mongoose.model("List", listSchema);
