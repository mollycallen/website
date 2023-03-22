import React from 'react'
import Time from './Time';
import { SocialIcon } from 'react-social-icons';
import Nav from './Nav';
import "../styles/Header.css"

const Header = () => {
    return (
        <div className="header">

            <div className='menu-icon'>
                <Nav></Nav>
            </div>
            <div className='header-left'>
                <div className="title">
                    <div className='name'>Molly Allen</div>
                    <div className='email'>mollyallen153@gmail.com</div>
                </div>
                <div className='header-right'>
                    <div className='social'>
                        <SocialIcon style={{ width: '35px', height: '35px' }} url="https://www.facebook.com/molly.allen.378537/" />
                        <SocialIcon style={{ width: '35px', height: '35px' }} url='https://twitter.com/Mollyal60327623' />
                        <SocialIcon style={{ width: '35px', height: '35px' }} url='https://www.instagram.com/mollyallen153/' />
                        <SocialIcon style={{ width: '35px', height: '35px' }} url='https://github.com/mollycallen' />

                    </div>
                    <Time />
                </div>
            </div >
        </div>


    )
}

export default Header
