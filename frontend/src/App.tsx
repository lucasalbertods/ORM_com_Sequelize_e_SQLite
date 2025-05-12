import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import MovieDetails from './pages/MoveDetails/MovieDetails';
import MyMovieDetails from './pages/MoveDetails/MyMovieDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/library/movie/:id" element={<MyMovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
