import React from 'react';
import './styles/App.scss';
import AboutPage from './pages/AboutPage.js';
import ProjectsPage from './pages/ProjectsPage.js';
import ContatctPage from './pages/ContactPage.js';
import WelcomePage from './pages/WelcomePage.js';
import Background from './images/background.jpg';
import "@fontsource/ibm-plex-sans"

const style = {
  backgroundImage: `url(${Background})`,
  backgroundSize: 'cover',
  fontFamily: "IBM Plex Sans",
}

function App() {
  return (
    <div className="App" style={ style }>
      <div className='header'>
        <p>Header</p>
      </div>
      <div id="Content">
        <WelcomePage />
        <AboutPage />
        <ProjectsPage />
        <ContatctPage />
      </div>
    </div>
  );
}

export default App;
