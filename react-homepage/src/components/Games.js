import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Games.css'
const path = process.env.PUBLIC_URL;

const Games = () => {
    const GAMES = [
        {
            title: 'Tic Tac Toe',
            url: `${path}/TicTacToe/index.html`
        },
        {
            title: 'Matching Game',
            url: `${path}/Memory/index.html`
        },
        {
            title: 'Jeopardy',
            url: `${path}/Jeopardy/index.html`
        },
        {
            title: 'Pong',
            url: `${path}/Pong/index.html`
        },
        {
            title: 'Simon',
            url: `${path}/Simon/index.html`
        },
        {
            title: 'Flappy Bird',
            url: `${path}/FlappyBird/index.html`
        },
        {
            title: 'Dino Game',
            url: `${path}/Dino/index.html`
        }

    ]
    const [activeGameId, setActiveGameId] = useState(5);
    const [activeGame, setActiveGame] = useState(GAMES[activeGameId]);

    function changeGame(id) {
        setActiveGameId(id);
        setActiveGame(GAMES[id]);
        console.log(id)
    }
    return (
        <div className='game-box'>
            <div className='tab-menu'>
                {GAMES.map((game, index) =>
                    <button key={index} className={`tab ${activeGameId === index ? 'active' : ''}`} onClick={() => changeGame(index)}>{game.title}</button>
                )}
                <div className='no-tab'>
                    <div className='btn-div'>
                        <Link className="menu-link" to='/'><button className="close-btn">x</button></Link>
                    </div></div>
            </div>
            <div className='game-area'>
                <iframe title="gameboard" src={activeGame.url}></iframe>

            </div>
        </div >
    )
}

export default Games
