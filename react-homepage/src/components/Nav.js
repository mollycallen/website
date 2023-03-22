import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Nav.css'

const Nav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    function toggleMenu() {

        document.getElementById('left-nav').style.width = menuOpen ? '0px' : '250px';
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
                        <Link onClick={toggleMenu} className="menu-link" to='/about'>About Me</Link>
                    </div>
                    <div className='menu-item'>
                        <Link onClick={toggleMenu} className="menu-link" to='/games'>Games</Link>
                    </div>
                    <div className='menu-item'>
                        <Link onClick={toggleMenu} className="menu-link" to='/tools'>Tools</Link>
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
