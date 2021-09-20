// Create the Schema, model and export the file
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

	name: String,
	status: {
		type: String,
		default: 'pending'
	}
});


module.exports = mongoose.model("Task", taskSchema);
// module.exports is a way for Node js to treat this value as a package that can be used by other files




// Model -> Controllers -> Routes -> index.js(main server)