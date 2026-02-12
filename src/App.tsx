import { HashRouter, Route, Routes } from 'react-router-dom';
import { GlobalFooter } from './components/GlobalFooter';
import { ScoreDisplay } from './components/ScoreDisplay';
import IdiomGame from './games/idiom-game/IdiomGame';
import WhoIsTheSpy from './games/who-is-the-spy/WhoIsTheSpy';
import { Home } from './pages/Home';

function App() {
  return (
    <HashRouter>
      <ScoreDisplay />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/idiom-game" element={<IdiomGame />} />
        <Route path="/who-is-the-spy" element={<WhoIsTheSpy />} />
      </Routes>
      <GlobalFooter />
    </HashRouter>
  );
}

export default App;
