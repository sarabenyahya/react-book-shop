import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"


function BookDetails() {

    const { id } = useParams()
    const [book, setBook] = useState(null)

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/books/v1/volumes/${id}`
                );
                console.log(response.data)
                setBook(response.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        }
        fetchBookDetails()
        console.log(book)
    }, [id])

    if (!book) {
        return <div className="p-6 text-center">Loading book details...</div>;
    }

    const {title} = book.volumeInfo
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-blue-600">{title}</h1>
            <div className="mt-4">
                <img
                    src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
                    alt={book.volumeInfo.title}
                    className="w-64 h-96 object-cover rounded-md mx-auto"
                />
                <p className="mt-4 text-lg">{book.volumeInfo.description}</p>
                <p className="mt-2 text-sm text-gray-600">Authors: {book.volumeInfo.authors?.join(", ")}</p>
                <a
                    href={book.volumeInfo.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block text-blue-500 hover:underline"
                >
                    Preview on Google Books
                </a>
            </div>
        </div>
    )
}


export default BookDetails