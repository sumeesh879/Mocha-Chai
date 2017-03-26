const mongoose = require('mongoose');
const Book = require('../models/book');

// GET /book route to retrieve all the books

function getBooks(req, res) {
    Book.find(function (err, books) {
        if(err) res.send(err);
        res.json(books);
    });
}

// POST /book to save a new book
function postBook(req, res) {
    // Create a new book
    let newBook = new Book(req.body);
    // Save it into DB
    newBook.save((err, book) => {
        if(err) res.send(err);
        res.json({message: "Book Successfully added!!", book})
    })
}

// GET particular book
function getBook(req, res) {
    Book.findById(req.params.id, (err, book) => {
        if(err) res.send(err);
        res.json(book);
    })
}

// DELETE particular book
function deleteBook(req, res) {
    Book.remove({_id: req.params.id}, (err, result) => {
        res.json({ message: "Book successfully deleted" });
    })
}

// Update particular book
function updateBook(req, res) {
    Book.findById(req.params.id, (err, book) => {
        if(err) res.send(err)
        else {
            Object.assign(book, req.body).save((Err, book) => {
                if(err) res.send(err);
                res.json({ message: "Book Successfully Updated", book });
            });
        }
    });
}

module.exports = { getBook, getBooks, postBook, updateBook, deleteBook };