import React from "react";
import '../styles/ProjectsPage.scss'
import projects from '../components/projectsList.js';
import { FiLink } from 'react-icons/fi';
import { IconContext } from "react-icons";

const linkTypes = {
    'website': <FiLink />,
}

function ProjectsPage(props) {
    return (
        <div id={props.id} className='projects-page'>
            <div className='projects-header'>
                <h1>Projects</h1>
            </div>
            <div className='projects-container'>
                {projects.map((project, index) => {
                    return (
                    <div key={index} className='project'>
                        <div style={{ borderBottomColor: project.colorTheme }} className='project-name'>
                            <div className='project-image'>
                                <img src={project.image} alt='project'/>
                            </div>
                            <p>{project.name}</p>
                        </div>
                        <div className='project-description'>
                        {project.type}
                            <div className='project-keywords'>
                                <p>
                                {project.keywords.map((keyword, index, arr) => {
                                    let key = keyword
                                    if (arr.length - 1 !== index) {
                                        key += ' / ';
                                    } 
                                    return key;
                                })}
                                </p>
                            </div>
                            <div className='project-links'>
                                {project.links.map((link, index) => {
                                    return (
                                    <a key={index} target="_blank" rel="noopener noreferrer" className='info-links' href={link.link}>
                                        <IconContext.Provider value={{ className: "info-icon" }}>
                                            {linkTypes[link.type]}
                                        </IconContext.Provider>
                                    </a>
                                    )
                                })}
                            </div>
                        </div> 
                    </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ProjectsPage;