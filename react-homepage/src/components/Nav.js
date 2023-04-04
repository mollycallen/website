import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, } from "@fortawesome/free-solid-svg-icons"
import { useState, useContext } from 'react'
import { DisplayContext } from '../App'
import { Link } from 'react-router-dom'
import '../styles/Nav.css'

const Nav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showAbout, setShowAbout, showNews, setShowNews] = useContext(DisplayContext);

    function toggleMenu() {

        document.getElementById('left-nav').style.left = menuOpen ? '-270px' : '0px';
        setMenuOpen(prev => !prev);
    }

    return (
        <div className="menu-container">
            <div className='top-nav'>
                <Link className='menu'><FontAwesomeIcon icon={faBars} onClick={toggleMenu}></FontAwesomeIcon></Link>

            </div>
            <div className='left-menu-container'>
                <div id="left-nav" /* style={menuOpen ? { 'display': 'flex' } : { 'display': 'none' }} */>
                    <div className='btn-div' >
                        <button onClick={toggleMenu} className='close-btn'>x</button>
                    </div>
                    <div className='menu-item'>
                        <Link onClick={() => {
                            setShowNews(true);
                            toggleMenu();
                        }
                        } className="menu-link" to='/website'>Latest News</Link>
                    </div>
                    <div className='menu-item'>
                        <Link onClick={() => {
                            setShowAbout(true);
                            toggleMenu();
                        }
                        } className="menu-link" to='/website'>About Me</Link>
                    </div>
                    <div className='menu-item'>
                        <Link onClick={toggleMenu} className="menu-link" to='/website/recipe'>Recipe Search</Link>
                    </div>
                    <div className='menu-item'>
                        <Link onClick={toggleMenu} className="menu-link" to='/website/games'>Games</Link>
                    </div>
                    <div className='menu-item'>
                        <Link onClick={toggleMenu} className="menu-link" to='/website/tools'>Tools</Link>
                    </div>
                    <div className='menu-item'>
                        <Link onClick={toggleMenu} className="menu-link" to='https://mollycallen.github.io/react-8pm/' target="_blank">8pm</Link>
                    </div>
                    <div className='menu-item'>
                        <Link onClick={toggleMenu} className="menu-link" to='https://mollycallen.github.io/practice/' target="_blank">Original Site</Link>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Nav
