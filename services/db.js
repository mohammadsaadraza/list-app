const mongoose = require("mongoose");
const keys = require("../config/keys");

module.exports = async () => {
	try {
		const conn = await mongoose.connect(keys.mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB Connected... ${conn.connection.host}`.red.bold);
	} catch (e) {
		console.log(`Error Connecting to MongoDB... ${e.message}`);
		process.exit(1);
	}
};
