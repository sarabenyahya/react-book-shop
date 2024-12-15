import logo from './logo.svg';
import './App.css';
import SearchBooks from './components/SearchBooks';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookDetails from './components/BookDetails';

function App() {
  return (
    <Router>
       <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<SearchBooks />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
