// Controllers contain the functions and business logic our Express js application
// Meaning all the operation it can do will be placed in this file

// Allows us to use the contents of the "task.js" in the models folder
const Task = require('../models/task');


// Controller function for getting all the tasks

module.exports.getAllTasks = () => {

	// The "return" statement, returns the result of the Mongoose method find() back to the "taskRoute.js" file which invokes this function when teh "/tasks" routes is accessed
	// The .then() method is used to wait for the Mongoose find() method to finish before sending the result back to the route and eventually to the client
	return Task.find({}).then(result => {
		// The "return" here, returns the result of the MongoDB query to the "result" parameter defined in the .then() method
		return result;
	})
}


// Controller function for creating task
// The request body coming from the client was passed from the "taskRoute.js" file via the "req.body" as an argument and is renamed 'requestBody' parameter in the controller file
module.exports.createTask = (requestBody) => {
	// Create a task object based on the Mongoose model Task
	let newTask = new Task({
		name: requestBody.name
	})

	// Saves the newly created "newTask" object in the MongoDB database
	// .then() method waits until the task is stored/error
	// .then() method will accept 2 arguments:
		// First parameter will store the result returned by the .save() method
		// Second parameter will store the error object
	// Compared to using a callback function on Mongoose methods discussed in the previous session, the first parameter stores the result and the error is stored in the second parameter.
	return newTask.save().then((task, error) => {	// use return when using .then() for error handling
		// if an error is encountered, the "return" statement will prevent any other line or code below it and within the same code block from executing
		// Since the following return statement is nested within the .then() method chained to the .save() method, they do not preven each other from executing code.
		if(error) {
			console.log(error);
			return false;
		}
		else {
			return task;
		}
	})
}

// Delete task
// Business Logic
/*
1. Look for the task with the corresponding id provided in the URL/route
2. Delete the task using the Mongoose method "findByIdAndRemove" with the same id provided in the route
*/

module.exports.deleteTask = (taskId) => {
	return Task.findByIdAndRemove(taskId).then((removedTask, err) => {
		if (err) {
			// if an error is encountered returns a "false" boolean back to the client
			console.log(err);
			return false;
		}
		else {
			// Delete successful, returns the removed task object back to the client
			return removedTask;
		}
	})
}



// Updating a task
// Business Logic
/*
1. Get the task with the id using the method "findById"
2. Replace the task's name returned from the database with the "name" property from the request body
3. Save the task
*/

module.exports.updateTask = (taskId, newContent) => {
	return Task.findById(taskId).then((result, error) => {
		if (error) {
			console.log(err);
			return false;
		}


		// Results of the findById() method will be stored in the "result" parameter
		// It's "name" property will be reassigned the value of the "name" received from the request body
		result.name = newContent.name;

		return result.save().then((updatedTask, saveErr) => {
			if (saveErr) {
				console.log(saveErr)
				return false;
			}
			else {
				// Update successfully, returns the updated task object back to the client
				return updatedTask;
			}
		})
	})
}


/*s31 activity*/
// #2. Create a controller function for retrieving a specific task.
module.exports.getOneTask = (selectedTaskId) => {
	return Task.findById(selectedTaskId).then((resultTask, error) => {
		if (error) {
			console.log(error);
			return false;
		}
		else {
			return resultTask;
		}
	})
}


// #6. Create a controller function for changing the status of a task to "complete".
module.exports.updateTaskStatus = (selectedTaskId, updatedStatus) => {
	return Task.findById(selectedTaskId).then((resultTask, error) => {
		if (error) {
			console.log(error);
			return false;
		}

		resultTask.status = updatedStatus.status;

		return resultTask.save().then((updatedTask, err) => {
			if (err) {
				console.log(err);
				return false;
			}
			else {
				return updatedTask;
			}
		})
	})
}