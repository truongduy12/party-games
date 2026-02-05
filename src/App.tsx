import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ScoreDisplay } from './components/ScoreDisplay';
import { GlobalFooter } from './components/GlobalFooter';
import IdiomGame from './games/idiom-game/IdiomGame';

function App() {
  return (
    <BrowserRouter>
      <ScoreDisplay />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/idiom-game" element={<IdiomGame />} />
      </Routes>
      <GlobalFooter />
    </BrowserRouter>
  );
}

export default App;
