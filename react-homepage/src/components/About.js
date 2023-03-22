import { useState } from 'react'
import "../styles/About.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faAngleDoubleLeft, faUser } from '@fortawesome/fontawesome-free-solid'

const About = () => {
    const [isMore, setIsMore] = useState(false);

    const showMore = () => {
        console.log("show more")
        setIsMore(prev => !prev);
        const moreDiv = document.getElementById("more-div");
        console.log(moreDiv);
        if (isMore) {
            moreDiv.style.display = 'none';
        } else {
            moreDiv.style.display = 'block';
        }
    }
    return (
        <div className='about border'>
            <div className='avatar'>
                <img src="./images/molly-avatar-cropped.png" alt="Molly's avatar"></img>
            </div>
            <div className="title">
                <FontAwesomeIcon className='icon' icon={faUser}></FontAwesomeIcon>
                About Me...</div>
            <div className='cat'>
                <p className='cat-title'>Currently</p>
                <p className="cat-detail">My youngest has started college, and its time to jump back into web development. I've been updating my skillset with the latest front-end technologies and showcasing my work on this website. Some projects are simple apps created with <span className="standout">HTML/CSS/JS</span>, while others are more sophisticated using <span className="standout">React</span>, all developed using <span className="standout">Git</span> and <span className="standout">Github</span>. Please take a look around!</p>
            </div>


            <div className='cat'>
                <p className='cat-title'>Skills</p>
                <div className='cat-detail skills'>
                    <div className="skill border">
                        <span className="standout">              Javascript</span>
                        <p className='indent'> Vanilla js, jQuery, DOM manipulation, async/await, API fetch, json, high-level array methods</p>
                    </div>
                    <div className="skill border">
                        <span className="standout">React</span>
                        <p className='indent'>useState, useEffect, useContext hooks, custom hooks, Browser Router, Route, NavLink, custom components</p>
                    </div>
                    <div className="skill border">
                        <span className="standout">CSS</span>
                        <p className='indent'>flexbox and grid design , media queries, animation, variables, SASS</p>
                    </div>
                    <div className="skill border">
                        <span className="standout">Others</span>
                        <p className='indent'>HTML, SQL and relational DBs, Git and Github</p>
                    </div>

                </div>
                <div className='btn-div'>

                    <button className='btn' onClick={showMore}>
                        {isMore && <FontAwesomeIcon icon={faAngleDoubleLeft}></FontAwesomeIcon>}&nbsp;Show {isMore ? 'Less' : 'More'}&nbsp;
                        {!isMore && <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>}
                    </button>
                </div>
                <div id='more-div' >
                    <div className='cat'>
                        <p className='cat-title'>Education</p>
                        <div className='row'>
                            <a href='http://www.osu.edu'><img alt="The Ohio State University icon" className="school-icon" src='./images/Ohio_State_Buckeyes_logo.svg'></img></a>
                            <div>
                                The Ohio State University -
                                BS in Computer Science
                            </div>
                        </div>
                        <div className='row'>
                            <a href="http://www.etsu.edu"><img alt="East Tennessee State University icon" className="school-icon" src='./images/200px-East_Tennessee_State_Buccaneers_logo.svg.png'></img></a>
                            <div>
                                East Tennessee State University -
                                MS in Computer Science
                            </div>
                        </div>
                    </div>
                    <div className='cat'>
                        <p className='cat-title'>Experience</p>
                        <div className='job border'>
                            <div className='job-header'>
                                <p className='standout'>Internal Software Developer</p>
                                <p>Tallan - Glastonbury, CT</p>
                                <p>May 2000 to May 2002</p>
                            </div>
                            <div className='job-detail'>
                                <p>Developed intranet-based apps using java, javascript, html, sql, and Crystal Reports for multiple departments.</p>
                                <p>Involved in project definition, design, development, db table definition, and testing in a team environment.</p>
                            </div>
                        </div>
                        <div className='job border'>
                            <div className='job-header'>
                                <p className='standout'>Project Coordinator / Client Liaison</p>
                                <p>ZFx, Inc. - Kingsport, TN</p>
                                <p>July 1999 to May 2000</p>
                            </div>
                            <div className='job-detail'>
                                <p>Involved in several aspects of application and website development</p>
                                <p>Worked closely with clients and programmers to define project specifications, determine costs, and manage development</p>
                            </div>
                        </div>
                    </div>

                    <div className='cat'>
                        <p className='cat-title'>Location</p>
                        <p className='cat-detail'>I live in the beautiful hills of east Tennessee.  Relocating is not an option, but I'm an excellent candidate to work remotely.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default About
