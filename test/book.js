process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Book = require('../controllers/models/book');

// Require dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);
// Our parent block
describe('Books', () => {
    beforeEach((done) => { // Before each test we empty database
        Book.remove({}, (err) => {
            done();
        });
    });

    // Test the /GET route
    describe('/GET book', () => {
        it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/book')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    // Test the /POST route
    describe('/POST book', () => {
        // it('it should not post a book without pages field', (done) => {
        //     let book = {
        //         title: "The Lord of the Rings",
        //         author: "J.R.R Tolkien",
        //         year: 1954
        //     }
        //     chai.request(server)
        //         .post('/book')
        //         .send(book)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a('object');
        //             res.body.should.have.property('errors');
        //             res.body.errors.should.have.property('pages');
        //             res.body.errors.pages.should.have.property('kind').eql('required');
        //             done();
        //         });
        // });
        it('it should post a book', (done) => {
            let book = {
                title: "The Lord of the Rings",
                author: "J.R.R Tolkien",
                year: 1954,
                pages: 567
            }
            chai.request(server)
                .post('/book')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.a('object')
                    res.body.should.have.property('message').eql('Book Successfully added!!')
                    res.body.book.should.have.property('title')
                    res.body.book.should.have.property('author');
                    res.body.book.should.have.property('year');
                    res.body.book.should.have.property('pages');
                    done();
                });
        });
    });
});
