import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Tools.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, } from '@fortawesome/fontawesome-free-solid'

const path = process.env.PUBLIC_URL;

const Tools = () => {
    const TOOLS = [
        {
            title: 'Calculator',
            url: `${path}/Calculator/index.html`
        },
        {
            title: 'Stopwatch',
            url: `${path}/Stopwatch/index.html`
        },
        {
            title: 'Timer',
            url: `${path}/Timer/index.html`
        },
        {
            title: 'HSL Color Picker',
            url: `${path}/HSL/index.html`
        },

    ]
    const [activeToolId, setActiveToolId] = useState(1);
    const [activeTool, setActiveTool] = useState(TOOLS[activeToolId]);

    function changeTool(id) {
        setActiveToolId(id);
        setActiveTool(TOOLS[id]);
    }

    return (
        <div className="tools box">
            <div className='tools-menu'>
                {TOOLS.map((tool, index) =>
                    <button key={index} className={`tool ${activeToolId === index ? 'active' : ''}`} onClick={() => changeTool(index)}>{tool.title}&nbsp;
                        {activeToolId === index && <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>}
                    </button>
                )}
            </div>
            <div className='btn-div'>
                <Link className="menu-link" to='/'><button className="close-btn">x</button></Link>
            </div>
            <div className='tool-area'>
                <iframe title="workbench" src={activeTool.url}></iframe>

            </div>
        </div>

    )
}

export default Tools
