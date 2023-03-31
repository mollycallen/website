import { useContext } from 'react'
import { DisplayContext } from '../App';
import '../styles/News.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, } from '@fortawesome/fontawesome-free-solid'

const News = () => {
    const [, , showNews, setShowNews] = useContext(DisplayContext);

    return (
        <>
            {showNews &&
                <div className='news box'>
                    <div className='btn-div'>
                        <button className="close-btn" onClick={() => { setShowNews(false) }}>x</button>
                    </div>
                    <div className='title'>
                        <FontAwesomeIcon className='icon' icon={faListAlt}></FontAwesomeIcon>
                        The Latest...
                    </div>
                    <div className='news-item'>
                        <div className='news-date'>3/31/23</div>
                        <div className='news-text'>
                            Added useContext hook to save settings throughout website. Added Todo List in Tools section.
                        </div>
                    </div>
                    <div className='news-item'>
                        <div className='news-date'>3/23/23</div>
                        <div className='news-text'>
                            Deployed new website on Github.  Still working out the bugs, please be patient.
                        </div>
                    </div>
                    <div className='news-item'>
                        <div className='news-date'>3/15/23</div>
                        <div className='news-text'>
                            Started new personal website using react.  Old website will still be available from the menu.
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default News
