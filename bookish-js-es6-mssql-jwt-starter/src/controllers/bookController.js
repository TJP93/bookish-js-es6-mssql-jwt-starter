import BookRepository from '../repositories/bookRepository.js';
import Book from '../models/book.js';
import express from 'express';

class BookController {
    constructor() {
        this.bookRepository = new BookRepository();
        this.router = express.Router();
        this.router.get('/', (request, response) => this.getAllBooks(request, response));
        this.router.get('/:id', (request, response, next) => this.getBook(request, response, next));
        this.router.post('/', (request, response) => this.addBook(request, response));
    }

    async getAllBooks(request, response) {
        console.log("User: " + (('user' in request) ? JSON.stringify(request.user) : "unknown"));

        try {
            let books = await this.bookRepository.getAllBooks()
            response.status(200).send(books);
        } catch (error) {
            BookController.errorResponse(response, error);
        }
    }

    async getBook(request, response, next) {
        const id = request.params.id;
        let book = await this.bookRepository.getBookById(id)

        try {
            if (book) {
                response.status(200).send(book);
            } else {
                var err = 'Not found, id = ' + id;
                response.status(404).send(err);
            }
        } catch (error) {
            BookController.errorResponse(response, error);
        }
    }

    async addBook(request, response) {
        const book = BookController.getBookFromRequest(request);
        if (!book) {
            response.status(400).send({ errors: ['Invalid book'] });
            return;
        }

        try {
            let id = this.bookRepository.addBook(book)

            console.log("inserted " + id);
            const reference = request.protocol + '://' + request.get('host') + request.originalUrl + "/" + id;
            const responseBody = {
                "message": "Book added successfully",
                "id": id,
                "reference": reference
            };

            response.status(201)
                .set('Location', reference)
                .send(JSON.stringify(responseBody));
        }
        catch (error) {
            BookController.errorResponse(response, error);
        }
    }

    static errorResponse(response, error) {
        response.status(500).send({ errors: [error.message] })
    }

    static getBookFromRequest(request) {

        if (request.body &&
            'title' in request.body &&
            'author' in request.body
        ) {
            const title = request.body.title;
            const author = request.body.author;
            const isbn = ('isbn' in request.body) ? request.body.isbn : null;

            // id is generated by db, so currently unknown
            const book = new Book(null, title, author, isbn);
            console.log("book to add " + JSON.stringify(book));
            return book;
        } else {
            return null;
        }
    }


}

export default new BookController().router;
