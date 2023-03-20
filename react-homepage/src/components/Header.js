import React from 'react'
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import Nav from './Nav';
import "../styles/Header.css"

const Header = () => {
    return (
        <div className="header">
            <div className="top-row">
                <div className="personal">
                    <Link to="/">
                        <img alt="mountain icon" src="./images/natureicon.png"></img>
                    </Link>
                    <div>
                        <div className='title'>Molly Allen</div>
                        <div>mollyallen153@gmail.com</div>
                    </div>
                </div>
                <div className='social'>
                    <SocialIcon url="https://www.facebook.com/molly.allen.378537/" />
                    <SocialIcon url='https://twitter.com/Mollyal60327623' />

                    <SocialIcon url='https://www.instagram.com/mollyallen153/' />
                    <SocialIcon url='https://github.com/mollycallen' />


                </div>
            </div>
            <Nav></Nav>

        </div>
    )
}

export default Header
