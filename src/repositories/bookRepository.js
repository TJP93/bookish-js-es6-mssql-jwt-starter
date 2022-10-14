import {executeSql} from '../helpers/dbHelper.js';
import Book from '../models/book.js';

export default class BookRepository {
    getAllBooks() {
        return executeSql('SELECT * FROM books')
            .then(result => {
                let books = result.recordset;
                return books.map(book => {
                    return new Book(book.id, book.title, book.author, book.isbn);
                });
            });
    }

    getBookById(id) {
        console.log("get book " + id);
        return executeSql('SELECT * FROM books WHERE id = @bookid', { 'bookid' : id} )
            .then(result => {
                let books = result.recordset;
                if ( books.length < 1) {
                    return null;
                }
                     
                let book = books[0];
                return new Book(book.id, book.title, book.author, book.isbn);
            });
    }

    addBook(book) {
        return executeSql('INSERT INTO books(title, author, isbn) OUTPUT INSERTED.id VALUES(@title, @author, @isbn)',
            { 'title': book.title, 'author': book.author, 'isbn': book.isbn})
            .then(result => {
                console.log("inserted: " + JSON.stringify(result) );
                let insertOutputRows = result.recordset;
                if ( insertOutputRows.length < 1) {
                    return null;
                }
                     
                return insertOutputRows[0].id;
            });
            
            ;
    }


}
