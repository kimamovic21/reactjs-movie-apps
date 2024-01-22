import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen m-2">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </Router>
  );
};

export default App;