import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import './styles/App.scss';
import AboutPage from './pages/AboutPage.js';
import ProjectsPage from './pages/ProjectsPage.js';
import ContatctPage from './pages/ContactPage.js';
import { Scrollbars } from 'react-custom-scrollbars-2';

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
  const { height, width } = useWindowDimensions();
  const [scrollState, setScrollState] = useState({
    isScrolling: false,
    pageIndex: 0,
    scrollDirection: 0
  });
  const scrollbar = useRef(null);
  const pageNum = 2;

  function handleScroll(evt) {
    //scrollbar.current.scrollTop(height);
  }

  function handleWheel(evt) {
    if ( !scrollState.isScrolling ) {
      const scrollDirection = evt.deltaY / Math.abs(evt.deltaY);
      if ((scrollDirection < 0 && scrollState.pageIndex > 0) || (scrollDirection > 0 && scrollState.pageIndex < pageNum)) {
        const newPageIndex = scrollState.pageIndex + scrollDirection
        setScrollState({
          isScrolling: true,
          pageIndex: newPageIndex,
          scrollDirection: scrollDirection
        })
      } 
    }
  }

  useLayoutEffect(() => {
    const scrollDuration = 1000; //milliseconds
    const currentPagePosition = scrollbar.current.getScrollTop();
    const newPagePosition = height * scrollState.pageIndex;
    let start, pagePosition;

    function animateScroll(timestamp) {
      if ( start === undefined ) {
        start = timestamp;
      }
      const elapsed = timestamp - start;
      let increment = height * easeInOutCubic(elapsed / scrollDuration);
      if (scrollState.scrollDirection > 0) {
        pagePosition = Math.min(currentPagePosition + increment * scrollState.scrollDirection, newPagePosition);
      } else {
        pagePosition = Math.max(currentPagePosition + increment * scrollState.scrollDirection, newPagePosition);
      }
      scrollbar.current.scrollTop(pagePosition);
      if (elapsed < scrollDuration) {
        window.requestAnimationFrame(function(step) { animateScroll(step); });
      } else {
        setScrollState(scrollState => ({...scrollState, isScrolling: false}));
      }
    }
    if ( scrollState.isScrolling ) {
      window.requestAnimationFrame(function(step) { animateScroll(step);} );
    }
  }, [height, scrollState, scrollbar]);

  return (
    <div className="App">
      <Scrollbars 
        autoHeight={true}
        autoHeightMax={height}
        onScroll={handleScroll}
        onWheel={handleWheel}
        ref={scrollbar}
      >
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
      </Scrollbars>
    </div>
  );
}

export default App;
