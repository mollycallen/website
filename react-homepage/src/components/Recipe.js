import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensilSpoon, } from "@fortawesome/free-solid-svg-icons"
import '../styles/Recipe.css';
import ScrollRecipes from './ScrollRecipes';
import SearchRecipes from './SearchRecipes';

const Recipe = () => {

    return (
        <div className='recipe box'>
            <div>
                <div className='btn-div'>
                    <Link className="menu-link" to='/'><button className="close-btn">x</button></Link>
                </div>
                <div className='title'>
                    <div>
                        <FontAwesomeIcon className="icon" icon={faUtensilSpoon}></FontAwesomeIcon> What's for dinner...
                    </div>
                </div>
                <ScrollRecipes></ScrollRecipes>
                <SearchRecipes></SearchRecipes>
            </div>
        </div>
    )
}

export default Recipe
