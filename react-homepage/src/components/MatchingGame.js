import React from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const MatchingGame = () => {
    return (

        <Popup trigger={<button> Trigger</button>} modal nested>
            <div>Popup content here !!</div>
        </Popup>
    )
}

export default MatchingGame
