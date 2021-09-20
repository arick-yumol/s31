// Route => contains all the endpoint for our application
// We separate the routes such that "index.js" only contains information on the server
// We need to use express Router() function to achieve this
const express = require('express');
// Creates a Router instance that functions as a middleware and routing system
// allows access to HTTP method middlewares that makes it easier to create routes for our application
const router = express.Router();
// The "taskController" allows us to use the functions defined in the taskController.js file
const taskController = require("../controllers/taskController") // no need to put .js because all Express files are in js


// Routes are responsible for defining the URIs that our client accesses and the corresponding controller function that will be used when a route is accessed.
// localhost:3001/tasks/getAll
router.get('/getAll', (req, res) => {
	// Invokes the "getAllTasks" function from the "taskController.js" file and sends the result back to the client

	// "resultFromController" is only used here to make the code easier to understand but it's common practice to use the shorthand parameter name for a result using the parameter name "result"/"res"
	taskController.getAllTasks().then(resultFromController => res.send(resultFromController));
})


// Create new Task
router.post('/', (req, res) => {
	// The createTask() function needs the data from the request body, so we need to supply it to the function
	// If information will coming from the client side commonly from forms, the data can be accessed from the request "body" property
	taskController.createTask(req.body).then(result => res.send(result));
})


// To delete a task
// This route expects to receive a DELETE request at the URL "/tasks/:id"
// http://localhost:3001/tasks/:id
// the task ID is obtained from the URL is denoted by the ":id" identifier in the route
// The colon (:) is an identifier that helps create a dynamic route which allows us to supply information in the URL
// The word that comes after the colon (:) symbol will be the name of the URL parameter
// ":id" is a WILDCARD where you can put any value, it then creates a link between "id" parameter in the URL and the value provided in the URL
// Example:
	// if the route is localhost:3000/tasks/1234
	// 1234 is assigned to the "id" parameter in the URL
router.delete('/:id', (req, res) => {
	// If the information will be coming from the URL, the data can be accessed from the request "params" property
	// In this case "id" is the name of the parameter, the property name of this object will match the given URL parameter
	// req.params.id
	taskController.deleteTask(req.params.id).then(result => res.send(result));
})



// Update a task
router.put('/:id', (req, res) => {
	// req.params.id retrieves the taskId from the parameter
	// req.body retrieves the data of the updates that will be applied to a task from the request body
	taskController.updateTask(req.params.id, req.body).then(result => res.send(result));
})


/*s31 activity*/
// #1. Create a route for getting a specific task.
// #2. Create a controller function for retrieving a specific task.
router.get('/:id', (req, res) => {
	taskController.getOneTask(req.params.id).then(result => res.send(result));
})


// #5. Create a route for changing the status of a task to "complete".
router.put('/:id/complete', (req, res) => {
	taskController.updateTaskStatus(req.params.id, req.body).then(result => res.send(result));
})

module.exports = router;


module.exports = router;