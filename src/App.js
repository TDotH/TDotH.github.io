import React from 'react';
import './styles/App.scss';
import AboutPage from './pages/AboutPage.js';
import ProjectsPage from './pages/ProjectsPage.js';
import ContatctPage from './pages/ContactPage.js';

function App() {
  return (
    <div className="App">
      <div id="Content">
        <div>
          <AboutPage />
        </div>
        <div>
          <ProjectsPage />
        </div>
        <div>
          <ContatctPage />
        </div>
      </div>
    </div>
  );
}

export default App;
