// Define an array of books
const books = [
    { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, genre: "Fantasy" },
    { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", year: 1997, genre: "Fantasy" },
    { title: "Eragon", author: "Christopher Paolini", year: 2002, genre: "Fantasy" },
    { title: "1984", author: "George Orwell", year: 1949, genre: "Dystopian" },
    { title: "Brave New World", author: "Aldous Huxley", year: 1932, genre: "Dystopian" },
    { title: "Fahrenheit 451", author: "Ray Bradbury", year: 1953, genre: "Dystopian" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, genre: "Fiction" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951, genre: "Fiction" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "Fiction" },
    { title: "The Road", author: "Cormac McCarthy", year: 2006, genre: "Post-Apocalyptic" },
    { title: "Station Eleven", author: "Emily St. John Mandel", year: 2014, genre: "Post-Apocalyptic" },
    { title: "The Stand", author: "Stephen King", year: 1978, genre: "Post-Apocalyptic" },
    { title: "The Martian", author: "Andy Weir", year: 2011, genre: "Sci-Fi" },
    { title: "Dune", author: "Frank Herbert", year: 1965, genre: "Sci-Fi" },
    { title: "Ender's Game", author: "Orson Scott Card", year: 1985, genre: "Sci-Fi" },
    { title: "Pride and Prejudice", author: "Jane Austen", year: 1813, genre: "Romance" },
    { title: "Jane Eyre", author: "Charlotte Brontë", year: 1847, genre: "Romance" },
    { title: "The Notebook", author: "Nicholas Sparks", year: 1996, genre: "Romance" },
    { title: "Moby-Dick", author: "Herman Melville", year: 1851, genre: "Adventure" },
    { title: "Treasure Island", author: "Robert Louis Stevenson", year: 1883, genre: "Adventure" },
    { title: "The Call of the Wild", author: "Jack London", year: 1903, genre: "Adventure" }
];

// Function to process book data with detailed logging
function processBookData(books) {
    if (!Array.isArray(books) || books.length === 0) {
        console.log("Invalid input: Must be a non-empty array.");
        return { booksAfter2000: [], authorsSorted: [], genreCount: {}, averageYear: null };
    }
    
    console.log("Processing book data...");
    
    // Filter books published after 2000
    const booksAfter2000 = books.filter(book => book.year > 2000);
    console.log("Books after 2000:", booksAfter2000);
    
    // Extract and sort authors alphabetically (case-insensitive), removing duplicates
    const authorsSorted = [...new Set(books.map(book => book.author.toLowerCase()))].sort((a, b) => a.localeCompare(b));
    console.log("Sorted unique authors:", authorsSorted);
    
    // Count books by genre
    const genreCount = books.reduce((acc, book) => {
        acc[book.genre] = (acc[book.genre] || 0) + 1;
        return acc;
    }, {});
    console.log("Books per genre:", genreCount);
    
    // Calculate the average year of publication
    const totalYears = books.reduce((sum, book) => sum + book.year, 0);
    const averageYear = Math.round(totalYears / books.length);
    console.log("Average publication year:", averageYear);
    
    return {
        booksAfter2000,
        authorsSorted,
        genreCount,
        averageYear
    };
}

// Test the function with logging
console.log("Processed Book Data: ", processBookData(books));
