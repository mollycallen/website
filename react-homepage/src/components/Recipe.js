import { useState } from 'react'
import { useFetch } from '../hooks/UseFetch';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensilSpoon, } from "@fortawesome/free-solid-svg-icons"
import '../styles/Recipe.css';
import RecipeCard from './RecipeCard';

const Recipe = () => {
    const [search, setSearch] = useState('chicken');
    const [showRecipeCard, setShowRecipeCard] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const { data, isLoading, errorMessage } = useFetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=49c90bbe&app_key=5f34781d06871dd9de9481f698f23bc5&ingr=4-12&mealType=Dinner&random=true&field=label&field=image&field=images&field=source&field=url&field=yield&field=ingredientLines&field=calories&field=totalTime&field=cuisineType`)

    return (
        <div className='recipe box'>
            {errorMessage && <div>Recipe data is not available right now.  Please try back later.</div>}

            {data &&
                <div>
                    <div className='btn-div'>
                        <Link className="menu-link" to='/'><button className="close-btn">x</button></Link>
                    </div>
                    <div className='title'>

                        <div>
                            <FontAwesomeIcon className="icon" icon={faUtensilSpoon}></FontAwesomeIcon> What's for dinner...
                        </div>
                    </div>
                    <div >
                        <label htmlFor='search-input'>Enter Recipe or Food Name</label>
                        <div className='search-container'>
                            <input className="search-field" type="text" id='search-input'
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') setSearch(document.getElementById("search-input").value)
                                }}
                            ></input>
                            <button className='btn search-btn' id="search-button"
                                onClick={() => { setSearch(document.getElementById("search-input").value) }}>Search</button>
                        </div>
                    </div>

                    <div className='recipe-list'>
                        {data.hits.map((entry, index) =>
                            <div className="recipe-preview" key={index}
                                onClick={(e) => {
                                    setCurrentIndex(index);
                                    setShowRecipeCard(true);
                                }}>
                                <img alt={entry.recipe.label} src={entry.recipe.images.SMALL.url}></img>
                                <p>{entry.recipe.label}</p>
                            </div>
                        )}
                    </div>
                    {showRecipeCard && <RecipeCard details={data.hits[currentIndex].recipe} setShowRecipeCard={setShowRecipeCard} ></RecipeCard>}
                </div>

            }
        </div>

    )
}

export default Recipe
