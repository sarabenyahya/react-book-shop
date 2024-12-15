import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";



function SearchBooks() {
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false); // New loading state

    const searchBooks = async () => {
        if (!query) return; // Prevent empty search
        setLoading(true); // Set loading to true before fetching data
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
            const books = response.data.items || []

            setBooks(books)
        } catch (error) {
            console.error("Error has occured when fetching books: ", error)
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }


    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center text-blue-600">
                Google Books Search
            </h1>
            <div className="my-4 flex justify-center">
                <input
                    type="text"
                    placeholder="Search for books..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-1/2"
                />
                <button
                    onClick={searchBooks}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Search
                </button>
            </div>

            {loading ? ( // Show loading indicator while fetching
                <div className="flex justify-center my-6">
                    <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-blue-500 border-t-transparent"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {books.map((book) => (
                        <div key={book.id} className="border rounded-lg shadow-md p-4 bg-white">
                            <img
                                src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
                                alt={book.volumeInfo.title}
                                className="w-full h-40 object-cover rounded-md"
                            />
                            <h2 className="text-lg font-semibold mt-2">{book.volumeInfo.title}</h2>
                            <p className="text-sm text-gray-600">{book.volumeInfo.authors?.join(", ")}</p>
                            <Link
                                to={`/book/${book.id}`}
                                className="mt-4 inline-block text-blue-500 hover:underline"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}

{!loading && books.length === 0 && query && (
        <p className="text-center text-gray-500">No books found. Try another search.</p>
      )}

        </div>
    )
}


export default SearchBooks;