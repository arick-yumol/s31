// Setup the dependencies
const express = require('express');
const mongoose = require('mongoose');
// This allow us to use all the routes defined in taskRoute.js
const taskRoute = require('./routes/taskRoute');


// Server Setup
const app = express();
const port = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// Database connection
mongoose.connect("mongodb+srv://admin:admin@zuitt-bootcamp.brw90.mongodb.net/batch127_to-do?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

// Connection Error handling
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"))
db.once("open", () => console.log("We're connected to the cloud database"))


// Add the task route
// Allows all the task routes created in the "taskRoute.js" file to use "/tasks"
app.use('/tasks', taskRoute);
// localhost:3001/tasks



app.listen(port, () => console.log(`Now listening to port ${port}`))	//in GIT CLI use npm kill-port <port> (e.g. npm kill-port 3001)