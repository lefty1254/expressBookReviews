const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
    let userswithsamename = users.filter((user) => {
        return user.username === username
    });
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req, res) => {
    //Write your code here

    const username = req.body.username;
    const password = req.body.password; z

    if (username && password) {
        if (!doesExist(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registred. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });


});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    res.send(JSON.stringify(books, null, 4));
    //   return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    const isbn = parseInt(req.params.isbn)
    if (books[isbn]) {
        res.send(books[isbn])
    }
    else {
        return res.status(300).json({ message: "Invalid isbn" });
    }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const getAuthor = (authorName) => {
        keys = Object.keys(books)
        console.log(keys)
        let filtered_books = []
        for (let key in keys) {
            const book = books[key]
            if (book && book.author === authorName) {
                filtered_books.push(book)
            }
        }
        // console.log(`filtered_books length= ${filtered_books.length}, filtered_books = ${JSON.stringify(filtered_books)}`)
        if (filtered_books.length > 0) {
            if (filtered_books.length == 1)
                return filtered_books[0]
            return filtered_books

        }
        return false;
    }
    const author = getAuthor(req.params.author)
    if (author) {

        res.send(JSON.stringify(author, null, 4))
    }
    else {
        return res.status(300).json({ message: "Invalid author name" + req.params.author });
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const getTitle = (title) => {
        keys = Object.keys(books)
        console.log(keys)
        let filtered_books = []
        for (let key in keys) {
            const book = books[key]
            if (book && book.title === title) {
                filtered_books.push(book)
            }
        }
        // console.log(`filtered_books length= ${filtered_books.length}, filtered_books = ${JSON.stringify(filtered_books)}`)
        if (filtered_books.length > 0) {
            if (filtered_books.length == 1)
                return filtered_books[0]
            return filtered_books

        }
        return false;
    }
    const book = getTitle(req.params.title)
    if (book) {

        res.send(JSON.stringify(book, null, 4))
    }
    else {
        return res.status(300).json({ message: "Invalid author name" + req.params.title });
    }
    return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn
    if (books[isbn]) {
        res.send(books[isbn].reviews)
    }
    else {
        return res.status(300).json({ message: "Yet to be implemented" });
    }
});

module.exports.general = public_users;
