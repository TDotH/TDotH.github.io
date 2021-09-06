import React from "react";
import pfp from '../images/pfp.png';
import '../styles/AboutPage.scss';

function AboutPage(props) {
    return (
    <div id='About-Page'>
        <div className='info-card'>
            <img src={pfp} alt='Me'/>
            <p>Tyde Hashimoto</p>
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