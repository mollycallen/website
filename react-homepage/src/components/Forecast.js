import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Forecast.css"

const Forecast = () => {
    return (
        <div className=' box forecast'>
            <div className='btn-div'>
                <Link className="menu-link" to='/'><button className="close-btn">x</button></Link>
            </div>
            showing forecast
        </div>
    )
}

export default Forecast
