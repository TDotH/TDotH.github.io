import React, {useState, useEffect, useRef} from 'react';
import './styles/App.scss';
import AboutPage from './pages/AboutPage.js';
import ProjectsPage from './pages/ProjectsPage.js';
import ContatctPage from './pages/ContactPage.js';
import WelcomePage from './pages/WelcomePage.js';
import Background from './images/background.jpg';
import { Scrollbars } from 'react-custom-scrollbars-2';
import "@fontsource/ibm-plex-sans"

const style = {
  backgroundImage: `url(${Background})`,
  backgroundSize: 'cover',
  fontFamily: "IBM Plex Sans",
};

const headerLinks = [
  {
    name:'Welcome',
    scrollTo: 0
  },
  {
    name: 'Projects',
    scrollTo: 0
  },
  {
    name: 'Education',
    scrollTo: 0
  },
  {
    name: 'Contact',
    scrollTo: 0
  }
];

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function App() {
  const { height, width } = useWindowDimensions();
  const scrollbar = useRef(null);

  function scrollTo(index) {

  }

  return (
    <div className="App" style={ style }>
      <div className='header'>
        {headerLinks.map((link, index) => {
          return (
          <div className='header-link' key={index}>
            <p>{link.name}</p>
          </div>
          )
        })}
      </div>
        <Scrollbars
          autoHeight={true}
          autoHeightMax={height}
          style={{overflow:'none'}}
          ref={scrollbar}
        >
          <div id="Content" >
            <WelcomePage />
            <ProjectsPage />
            <ContatctPage />
          </div>
        </Scrollbars>
    </div>
  );
}

export default App;
