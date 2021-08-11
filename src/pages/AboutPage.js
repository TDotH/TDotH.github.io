import React from "react";
import pfp from '../images/pfp.png';
import '../styles/AboutPage.scss';
import { FaGithubSquare } from 'react-icons/fa';
import { SiLinkedin } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';

function AboutPage(props) {
    return (
    <div id='About-Page'>
        <div className='info-card'>
            <img src={pfp} alt='Me'/>
            <p>Tyde Hashimoto</p>
            <div className='icon-row'>
                <MdEmail />
                <FaGithubSquare />
                <SiLinkedin />
            </div>
        </div>
        <div className='about'>
            <h1>
                About Me
            </h1>
            <p>I'm a computer science major from Portland State University that's interested in a lot of things</p>
        </div>
    </div>
    );
}

export default AboutPage;