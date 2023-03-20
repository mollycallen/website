import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons"
import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Nav.css'

const Nav = () => {
    return (
        <div className='top-nav'>
            <Link className='menu'><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></Link>
            <Link to='https://mollycallen.github.io/react-8pm/' target="_blank">8pm</Link>
            <Link to='https://mollycallen.github.io/practice/'>Original Site</Link>


        </div>
    )
}

export default Nav
