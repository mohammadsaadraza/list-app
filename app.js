const express = require("express");
const colors = require("colors");
const morgan = require("morgan");

const connectDB = require("./services/db");
const listRoutes = require("./routes/listRoutes");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

connectDB();

app.use("/api/v1/lists", listRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started on PORT ${PORT}`.blue.bold);
});
