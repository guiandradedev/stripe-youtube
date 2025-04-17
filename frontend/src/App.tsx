import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Complete from './page/Complete';
import Cancel from './page/Cancel';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />
        <Route
          path="/complete"
          element={
            <Complete />
          }
        />
        <Route
          path="/cancel"
          element={
            <Cancel />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;