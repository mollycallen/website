import { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard';
import RecipePreview from './RecipePreview';
import '../styles/SearchRecipes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, } from '@fortawesome/fontawesome-free-solid'

const SearchRecipes = () => {
    const [search, setSearch] = useState('');
    const [showRecipeCard, setShowRecipeCard] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [nextPageUrl, setNextPageUrl] = useState(null);

    const API_KEY = process.env.REACT_APP_RECIPE_API_KEY;
    const API_ID = process.env.REACT_APP_RECIPE_API_ID;

    useEffect(() => {
        if (search === '') {
            document.getElementById('search-input').focus();
            return;
        }

        async function fetchData() {
            const url =
                `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${API_ID}&app_key=${API_KEY}&ingr=4-12&&random=false&field=label&field=image&field=images&field=source&field=url&field=yield&field=ingredientLines&field=calories&field=totalTime&field=cuisineType`;

            setIsLoading(true);
            try {
                const res = await fetch(url, {});
                const jsonData = await res.json();
                setData([...jsonData.hits]);
                setErrorMessage(null);
                setIsLoading(false);
                setNextPageUrl(jsonData._links.next);
            } catch (error) {
                setErrorMessage(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [search])

    async function getMoreData() {
        try {
            const res = await fetch(nextPageUrl.href, {});
            const jsonData = await res.json();
            setData(prev => [...prev, ...jsonData.hits]);
            setNextPageUrl(jsonData._links.next);
        } catch (error) {
            setErrorMessage(error);
        }
    }

    return (
        <div className='recipe box outer-recipe-container'>

            <div >
                <label htmlFor='search-input'>Enter Recipe or Ingredient Name</label>
                <div className='search-container'>
                    <input className="search-field" type="text" id='search-input'
                        required
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') setSearch(document.getElementById("search-input").value)
                        }}
                    ></input>

                    <button className='btn search-btn' id="search-button"
                        onClick={() => { setSearch(document.getElementById("search-input").value) }}>Search
                    </button>
                </div>
            </div>
            {errorMessage && <div>Recipe data is not available right now.  Please try back later.</div>}
            {isLoading && <div>Loading...</div>}
            {data && data.length > 0 &&
                <div className='search-list-container'>
                    <div className='search-list'>
                        {data.map((entry, index) =>
                            <RecipePreview index={index} label={entry.recipe.label} imageUrl={entry.recipe.images.SMALL.url} setCurrentIndex={setCurrentIndex} setShowRecipeCard={setShowRecipeCard} key={index}></RecipePreview>

                        )}
                    </div>
                    {nextPageUrl && <button className='btn more-btn' onClick={getMoreData}>More Recipes <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
                    </button>}
                </div>
            }
            {showRecipeCard && <RecipeCard details={data[currentIndex].recipe} setShowRecipeCard={setShowRecipeCard} ></RecipeCard>}
        </div>
    )
}

export default SearchRecipes
