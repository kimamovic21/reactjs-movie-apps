import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wrapper from './components/Wrapper';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import ShowDetails from './pages/ShowDetails';

const App: React.FC = () => {
  return (
    <Wrapper>
      <Router>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
          <Route path="/show/:showId" element={<ShowDetails />} />
        </Routes>
      </Router>
    </Wrapper>
  );
};

export default App;
