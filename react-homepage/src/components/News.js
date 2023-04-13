import { useContext } from 'react'
import { DisplayContext } from '../App';
import '../styles/News.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, } from '@fortawesome/fontawesome-free-solid'
import { Link } from 'react-router-dom';

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
                        <div className='news-date'>4/04/23</div>
                        <div className='news-text'>
                            Added more functionality to the recipe section-- two dropdown filters with results displayed in a horizontally scrollable list, and a more button at the bottom of the search section to display 20 more recipes.  Maybe try a <Link to='/website/recipe'>new recipe</Link>!
                        </div>
                    </div>
                    <div className='news-item'>
                        <div className='news-date'>4/04/23</div>
                        <div className='news-text'>
                            Started a new recipe section.  Still working on a few details, but the search feature is pretty slick. Check it out <Link to='/website/recipe'>here!</Link>
                        </div>
                    </div>
                    <div className='news-item'>
                        <div className='news-date'>3/31/23</div>
                        <div className='news-text'>
                            Added Todo List in Tools section. Old school todo list with data stored in local storage. You can add, delete, mark complete or priority, and print todos. Take a look <Link to='/website/tools'>here!</Link>
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
