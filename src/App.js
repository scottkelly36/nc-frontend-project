import "./App.css";
import Home from "./components/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Review from "./components/Review/Review.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="reviews/:review_id" element={<Review />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
