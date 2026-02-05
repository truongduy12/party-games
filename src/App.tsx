import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ScoreDisplay } from './components/ScoreDisplay';

function App() {
  return (
    <BrowserRouter>
      <ScoreDisplay />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
