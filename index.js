// Task 1: Working with Arrays of Books
const books = [
    { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, genre: "Fantasy" },
    { title: "1984", author: "George Orwell", year: 1949, genre: "Dystopian" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, genre: "Fiction" },
    { title: "The Road", author: "Cormac McCarthy", year: 2006, genre: "Post-Apocalyptic" },
    { title: "The Martian", author: "Andy Weir", year: 2011, genre: "Sci-Fi" },
    { title: "Dune", author: "Frank Herbert", year: 1965, genre: "Sci-Fi" },
    { title: "Brave New World", author: "Aldous Huxley", year: 1932, genre: "Dystopian" },
    { title: "Fahrenheit 451", author: "Ray Bradbury", year: 1953, genre: "Dystopian" },
    { title: "Pride and Prejudice", author: "Jane Austen", year: 1813, genre: "Romance" },
    { title: "Moby-Dick", author: "Herman Melville", year: 1851, genre: "Adventure" }
];

// Task 2: Expanding the Book System with Classes
class Library {
    constructor() {
        this.books = [];
        this.booksAfter2000 = [];
        this.genreCounts = {};
    }

    addBook(book) {
        if (!book || typeof book !== 'object') {
            throw new Error("Invalid book entry: Expected an object.");
        }
        const { title, author, year, genre } = book;
        if (!title || !author || typeof year !== 'number' || !genre) {
            throw new Error("Invalid book entry: title, author, year (number), and genre are required.");
        }
        this.books.push(book);
        if (year > 2000) {
            this.booksAfter2000.push(book);
        }
        this.genreCounts[genre] = (this.genreCounts[genre] || 0) + 1;
    }

    removeBook(title) {
        const index = this.books.findIndex(book => book.title === title);
        if (index === -1) {
            throw new Error(`Book with title "${title}" not found.`);
        }
        const [removedBook] = this.books.splice(index, 1);
        
        const indexAfter2000 = this.booksAfter2000.findIndex(book => book.title === title);
        if (indexAfter2000 !== -1) {
            this.booksAfter2000.splice(indexAfter2000, 1);
        }

        this.genreCounts[removedBook.genre]--;
        if (this.genreCounts[removedBook.genre] === 0) {
            delete this.genreCounts[removedBook.genre];
        }
    }

    getBooksByAuthor(author) {
        return this.books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
    }

    searchBooks({ year, genre, author, title }) {
        return this.books.filter(book => 
            (year ? book.year === year || (Array.isArray(year) && book.year >= year[0] && book.year <= year[1]) : true) &&
            (genre ? book.genre.toLowerCase().includes(genre.toLowerCase()) : true) &&
            (author ? book.author.toLowerCase().includes(author.toLowerCase()) : true) &&
            (title ? book.title.toLowerCase().includes(title.toLowerCase()) : true)
        );
    }

    getBooksAfter2000() {
        return this.booksAfter2000;
    }

    getGenreCounts() {
        return this.genreCounts;
    }

    static createFromJSON(jsonString) {
        try {
            const parsedBooks = JSON.parse(jsonString);
            if (!Array.isArray(parsedBooks)) {
                throw new Error("Invalid JSON format: Expected an array of books.");
            }
            const library = new Library();
            parsedBooks.forEach(book => {
                if (!book.title || !book.author || typeof book.year !== 'number' || !book.genre) {
                    throw new Error("Invalid book format in JSON.");
                }
                library.addBook(book);
            });
            return library;
        } catch (error) {
            throw new Error("Error parsing JSON: " + error.message);
        }
    }

    sortBooksBy(field, ascending = true) {
        const validFields = ["title", "author", "year", "genre"];
        if (!validFields.includes(field)) {
            throw new Error("Invalid sort field. Choose from: title, author, year, genre.");
        }
        return [...this.books].sort((a, b) => {
            if (a[field] < b[field]) return ascending ? -1 : 1;
            if (a[field] > b[field]) return ascending ? 1 : -1;
            return 0;
        });
    }
}

// Example Workflow
const jsonData = `  
  [  
    { "title": "1984", "author": "George Orwell", "year": 1949, "genre": "Dystopian" },  
    { "title": "The Hobbit", "author": "J.R.R. Tolkien", "year": 1937, "genre": "Fantasy" }  
  ]  
`;

const library = Library.createFromJSON(jsonData);

// Add a new book
library.addBook({  
  title: "Brave New World",  
  author: "Aldous Huxley",  
  year: 1932,  
  genre: "Dystopian"  
});

// Get results
console.log(library.searchBooks({ genre: "Dystopian" }));
console.log(library.getBooksByAuthor("J.R.R. Tolkien"));
console.log(library.getBooksAfter2000());
console.log(library.getGenreCounts());
