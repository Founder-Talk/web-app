require("dotenv").config();
const express = require("express");
const app = express();
const connectionDB = require("./config/db");
const PORT = process.env.PORT || 3000;
const dbgr = require("debug")("development: port");
connectionDB(); // Started Db

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoute = require("./routes/user.routes");

// Routes
app.use("/user", userRoute);

app.get("/", (req, res) => {
	res.send("Welcome to the Authentication API");
});

// Global Catch
app.use((req, res, err) => {
	res.status(400).json({
		message: `Something Broke ${err}`
	})
})

app.listen(PORT, () => {
	dbgr(`Server running on http://localhost:${PORT}`);
});