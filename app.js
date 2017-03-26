const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 3000;
const book = require('./controllers/routes/book');
const config = require('config');

// db options
const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000} },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
}

// db connection
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

// Don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    // use morgon to log at cmd line
    app.use(morgan('combined'));
}

// Pargse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => res.json({ message: "Welcome to our Bookstore" }));

app.route('/book')
    .get(book.getBooks)
    .post(book.postBook);

app.route('/book/:id')
    .get(book.getBook)
    .delete(book.deleteBook)
    .put(book.updateBook);

app.listen(port, () => {
    console.log("Listening on port: " + port);
});

module.exports = app; // for testing