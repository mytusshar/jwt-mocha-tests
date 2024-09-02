const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json()); // to support JSON-encoded bodies
app.use(
	express.urlencoded({
		// to support URL-encoded bodies
		extended: true
	})
);

/* ************************** Mocha, chai tests Start ************************** */
{
	const tasks = [
		{
			id: 1,
			name: 'Task 1',
			completed: false
		},
		{
			id: 2,
			name: 'Task 2',
			completed: false
		},
		{
			id: 3,
			name: 'Task 3',
			completed: false
		}
	];

	// GET
	app.get('/api/tasks', (request, response) => {
		response.send(tasks);
	});

	// GET (BY ID)
	app.get('/api/tasks/:id', (request, response) => {
		const taskId = request.params.id;
		const task = tasks.find((task) => task.id === parseInt(taskId));
		if (!task) {
			return response
				.status(404)
				.send('The task with the provided ID does not exist.');
		}
		response.send(task);
	});

	// POST
	app.post('/api/tasks', (request, response) => {
		const task = {
			id: tasks.length + 1,
			name: request.body.name,
			completed: request.body.completed
		};

		tasks.push(task);
		response.status(201).send(task);
	});

	//PUT
	app.put('/api/tasks/:id', (request, response) => {
		const taskId = request.params.id;
		const task = tasks.find((task) => task.id === parseInt(taskId));
		if (!task) {
			return response
				.status(404)
				.send('The task with the provided ID does not exist.');
		}

		task.name = request.body.name;
		task.completed = request.body.completed;

		response.send(task);
	});

	//PATCH
	app.patch('/api/tasks/:id', (request, response) => {
		const taskId = request.params.id;
		const task = tasks.find((task) => task.id === parseInt(taskId));
		if (!task) {
			return response
				.status(404)
				.send('The task with the provided ID does not exist.');
		}

		task.name = request.body.name;

		if (request.body.completed) {
			task.completed = request.body.completed;
		}
		response.send(task);
	});

	//DELETE
	app.delete('/api/tasks/:id', (request, response) => {
		const taskId = request.params.id;
		const task = tasks.find((task) => task.id === parseInt(taskId));
		if (!task)
			return response
				.status(404)
				.send('The task with the provided ID does not exist.');

		const index = tasks.indexOf(task);
		tasks.splice(index, 1);
		response.send(task);
	});
}

/* ************************** Mocha, chai tests End **************************** */

/* ************************ JWT practice Start ************************* */
{
	app.get('/', (req, res) => {
		console.log('get: /');
		res.json({ message: 'resp from get(/)' });
	});

	app.get('/login', (req, res) => {
		console.log('get: /login');
		const user = {
			id: 1,
			name: 'tushar',
			email: 'a@b.com'
		};

		jwt.sign({ user }, 'secret', (err, token) => {
			res.json({ token });
		});
	});

	app.post('/posts', verifyToken, (req, res) => {
		jwt.verify(req.token, 'secret', (err, authData) => {
			if (authData) {
				res.json({
					posts: 'this is my post',
					authData
				});
			} else {
				res.sendStatus(403);
			}
		});
	});

	function verifyToken(req, res, next) {
		console.log('verifyToken');
		if (!req.headers['authorization']) {
			res.sendStatus(403);
		} else {
			req.token = req.headers['authorization'].split(' ')[1];
			next();
		}
	}
}
/* ************************ JWT practice End ************************* */

// to run tests, need to export server.. its being used in indexTest.js file
module.exports = app.listen('3000', () => {
	console.log('server running on port : 3000');
});
