// --------------------------------------APP_CONFIG
const dotenv = require('dotenv');
dotenv.config();
const { app } = require('./server.js');
const { mongoose } = require('./models/db.js');
const host_server = process.env.SERVER_HOST || '127.0.0.1';
const port_server = 3000;
const host_db = process.env.DB_HOST || '127.0.0.1';
const port_db = 27017;

// --------------------------------------START SERVER+DB
(async () => {
	try {
		await mongoose.connect(`mongodb://${host_db}:${port_db}/nodejs_simpleauth`);
		if (mongoose.connection.readyState === 1) {
			console.log('Mongoose connected =)');
		} else {
			console.log('Mongoose not connected =(');
		}
		app.listen(port_server, host_server, () => {
			if (process.env.SERVER_PORT_OUTER) {
				console.log(`Server running at http://${host_server}:${process.env.SERVER_PORT_OUTER}/`);
			} else {
				console.log(`Server running at http://${host_server}:${port_server}/`);
			}
		});
	} catch (error) {
		console.log(error);
	}
})();

// --------------------------------------EXIT SERVER+DB
process.on('SIGINT', async () => {
	await mongoose.disconnect();
	console.log('\nMongoose disconnected!');
	process.exit(0);
});
