import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Planets from './pages/Planets';
import Starfield from './components/starfield';
import githubIcon from './assets/github.png';
import linkedinIcon from './assets/linkedin.png';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative w-full h-screen overflow-hidden text-white bg-black">
              <header className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 px-6 py-2 rounded-md shadow-lg flex gap-4">
                <Link
                  to="/"
                  className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors flex items-center gap-2 font-hubot"
                >
                  Home
                </Link>
                <Link
                  to="/planets"
                  className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors flex items-center gap-2 font-hubot"
                >
                  3D Planets
                </Link>
              </header>
              <Starfield />
              <div className="absolute inset-0 z-10 flex flex-col items-start justify-center pl-16">
                <h1 className="text-6xl font-extrabold italic font-hubot">Hello, I'm James</h1>
                <p className="mt-4 text-xl italic font-hubot">Product Manager</p>
                <div className="mt-6 flex gap-4">
                  <a
                    href="https://github.com/James-Bateman"
                    className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors flex items-center gap-2 font-hubot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={githubIcon} alt="GitHub" className="w-5 h-5" />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jamesbateman08/"
                    className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors flex items-center gap-2 font-hubot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/planets" element={<Planets />} />
      </Routes>
    </Router>
  );
}

export default App;