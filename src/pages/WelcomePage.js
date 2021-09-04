import React from 'react';
import pfp from '../images/pfp.png';
import '../styles/WelcomePage.scss';
import { FaGithubSquare, FaLinkedin, FaEnvelopeSquare } from 'react-icons/fa';
import { IconContext } from "react-icons";

function WelcomePage(props) {
    return (
        <div id={props.id} className='welcome-page'> 
            <div className='welcome-card'>
                <div className='welcome-text'>
                    <h1>Welcome!</h1>
                        <div className='info-card'>
                            <img src={pfp} alt='Me'/>
                            <div className='info-text'>
                                <p>I'm Tyde Hashimoto</p>
                                <p className='title-text'>Software Engineer</p>
                            </div>
                        </div>
                    <div className='icon-row'>
                        <a className='info-links' href='mailto: tyd@pdx.edu'>
                            <IconContext.Provider value={{ className: "info-icon" }}>
                                <FaEnvelopeSquare />
                            </IconContext.Provider>
                        </a>
                        <a className='info-links' href='https://github.com/TDotH'>
                            <IconContext.Provider value={{ className: "info-icon" }}>
                                <FaGithubSquare />
                            </IconContext.Provider>
                        </a>
                        <a className='info-links' href='https://www.linkedin.com/in/tyde-hashimoto-665456156/'>
                            <IconContext.Provider value={{ className: "info-icon" }}>
                                <FaLinkedin/>
                            </IconContext.Provider>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage;