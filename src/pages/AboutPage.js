import React from "react";
import pfp from '../images/pfp.png';
import '../styles/AboutPage.scss';
import { FaGithubSquare } from 'react-icons/fa';
import { SiLinkedin } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import { IconContext } from "react-icons";

function AboutPage(props) {
    return (
    <div id='About-Page'>
        <div className='info-card'>
            <img className='pfp' src={pfp} alt='Me'/>
            <div className='name'>
                <p>Tyde Hashimoto</p>
            </div>
            <div className='icon-row'>
                <a className='info-links' href='mailto: tyd@pdx.edu'>
                    <IconContext.Provider value={{ className: "info-icon" }}>
                        <MdEmail />
                    </IconContext.Provider>
                </a>
                <a className='info-links' href='https://github.com/TDotH'>
                    <IconContext.Provider value={{ className: "info-icon" }}>
                        <FaGithubSquare />
                    </IconContext.Provider>
                </a>
                <a className='info-links' href='https://www.linkedin.com/in/tyde-hashimoto-665456156/'>
                    <IconContext.Provider value={{ className: "info-icon" }}>
                        <SiLinkedin />
                    </IconContext.Provider>
                </a>
            </div>
        </div>
        <div className='about'>
            <h1>
                About Me
            </h1>
            <p>
                I'm a computer science gradutate from Portland State University. My experience ranges from working in Python to 
                c++ to Java. 
            </p>
        </div>
    </div>
    );
}

export default AboutPage;