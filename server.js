// --------------------------------------SERVER_CONFIG
const express = require('express');
const app = express();
const { router: apiRouter } = require('./routes/router.js');

// --------------------------------------COMMON_MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
	res.setHeader('Content-Type', 'text/html');
	next();
});
app.use('/api/v1', apiRouter);

app.get('/hello', (req, res) => {
	res.status(200);
	res.send('Hello, World!');
	res.end();
});

// --------------------------------------EXPORT
module.exports = { app };
