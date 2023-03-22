import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Tools.css'

const Tools = () => {
    const TOOLS = [
        {
            title: 'Calculator',
            url: "../Calculator/index.html"
        },
        {
            title: 'Stopwatch',
            url: "../Stopwatch/index.html"
        },
        {
            title: 'Timer',
            url: "../Timer/index.html"
        },
        {
            title: 'HSL Color Picker',
            url: "../HSL/index.html"
        },

    ]
    const [activeToolId, setActiveToolId] = useState(0);
    const [activeTool, setActiveTool] = useState(TOOLS[activeToolId]);

    function changeTool(id) {
        setActiveToolId(id);
        setActiveTool(TOOLS[id]);
    }

    return (
        <div className="tools">
            <div className='tools-menu'>
                {TOOLS.map((tool, index) =>
                    <button key={index} className={`tool ${activeToolId === index ? 'active' : ''}`} onClick={() => changeTool(index)}>{tool.title}</button>
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
