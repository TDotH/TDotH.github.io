import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import './styles/App.scss';
import ProjectsPage from './pages/ProjectsPage.js';
import WelcomePage from './pages/WelcomePage.js';
import Background from './images/background.jpg';
import { Scrollbars } from 'react-custom-scrollbars-2';
import "@fontsource/ibm-plex-sans"

const style = {
  backgroundImage: `url(${Background})`,
  backgroundSize: 'cover',
  fontFamily: "IBM Plex Sans",
};

const pages = [
  {
    name:'Welcome',
    page: (id) => <WelcomePage key={id} id={id}/>
  },
  {
    name: 'Projects',
    page: (id) => <ProjectsPage key={id} id={id}/>
  },
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

function easeInOutCubic(x) {
  /* Param:
   *  - x: Animation value [0-1] (start to finish)
   */
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function App() {
  const { height } = useWindowDimensions();
  const scrollbar = useRef(null);
  const pagePosition = useRef(0);
  const scrollAnimation = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollState, setScrollState] = useState({isScrolling: false, pageIndex: 0});

  function scrollTo(index) {
    setCurrentIndex(index);
    setScrollState({pageIndex: index, isScrolling: true});
  };

  function cancelScroll() {
    if (scrollState.isScrolling) {
      setScrollState({...scrollState, isScrolling: false});
    }
  };

  function updatePagePosition() {
    pagePosition.current = scrollbar.current.getScrollTop();
    if (!scrollState.isScrolling) {
      let content = document.getElementById('Content');
      for (let i = 0; i < content.children.length; i++) {
        let offset = content.children[i].offsetHeight / 2;
        if (pagePosition.current < content.children[i].offsetTop + offset) {
          setCurrentIndex(parseInt(content.children[i].id));
          break;
        } 
      }
    }
  };

  // Set current page position on initial render
  useEffect(() => {
    pagePosition.current = scrollbar.current.getScrollTop();
  }, [scrollbar]);

  // Scroll Animation
  useLayoutEffect(() => {
    const scrollDuration = 1000; //milliseconds
    const currentPagePosition = scrollbar.current.getScrollTop();
    const newPagePosition = document.getElementById(scrollState.pageIndex).offsetTop;
    const scrollDistance = Math.abs(newPagePosition - currentPagePosition);
    const scrollDirection = -Math.sign(currentPagePosition - newPagePosition);
    let start;

    function animateScroll(timestamp) {
      if ( start === undefined ) {
        start = timestamp;
      }
      const elapsed = timestamp - start;
      let increment = scrollDistance * easeInOutCubic(elapsed / scrollDuration);

      let truncationFunc = (scrollDirection > 0) ? Math.min : Math.max;
      scrollbar.current.scrollTop(truncationFunc(currentPagePosition + increment * scrollDirection, newPagePosition));

      if (elapsed < scrollDuration) {
        scrollAnimation.current = window.requestAnimationFrame(function(step) { animateScroll(step); });
      } else {
        setScrollState(scrollState => ({...scrollState, isScrolling: false}));
      }
    }

    if ( scrollState.isScrolling ) {
      window.cancelAnimationFrame(scrollAnimation.current);
      scrollAnimation.current = window.requestAnimationFrame(function(step) { animateScroll(step);} );

    } else {
      window.cancelAnimationFrame(scrollAnimation.current);
    }

  }, [scrollState, scrollbar]);

  return (
    <div className="App" style={ style }>
      <div className='header'>
        {pages.map((link, index) => {
          return (
          <div onClick={() => {scrollTo(index)}} 
               className={`header-link ${currentIndex === index ? 'header-link-active ' : ' '}`} 
               key={index}>
            <p>{link.name}</p>
          </div>
          )
        })}
      </div>
        <Scrollbars
          autoHeight={true}
          autoHeightMax={height}
          style={{overflow:'none'}}
          onScroll={updatePagePosition}
          onWheel={cancelScroll}
          ref={scrollbar}
        >
          <div id="Content" >
            {pages.map((page, index) => {
              return page.page(index);
            })}
          </div>
        </Scrollbars>
    </div>
  );
}

export default App;
