import { useState, useEffect } from 'react'
import { useFetch } from '../hooks/UseFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import RecipePreview from './RecipePreview';
import RecipeCard from './RecipeCard';
import "../styles/ScrollRecipes.css"

const PREVIEW_WIDTH = 158;
const mealTypeArray = [
    {
        label: 'Dinner/Lunch',
        value: 'dinner'
    },
    {
        label: 'Breakfast',
        value: 'breakfast'
    },
    {
        label: 'Brunch',
        value: 'brunch'
    },
    {
        label: 'Snack',
        value: 'snack'
    }
]

const cuisineTypeArray = [
    {
        label: 'American',
        value: 'american'
    },
    {
        label: 'Asian',
        value: 'asian'
    },
    {
        label: 'Chinese',
        value: 'chinese'
    },
    {
        label: 'Greek',
        value: 'greek'
    },
    {
        label: 'Indian',
        value: 'indian'
    },
    {
        label: 'Italian',
        value: 'italian'
    },
    {
        label: 'Mexican',
        value: 'mexican'
    },
]
const ScrollRecipes = () => {
    const [cuisineType, setCuisineType] = useState('American');
    const [mealType, setMealType] = useState('Dinner')
    const [showRecipeCard, setShowRecipeCard] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const API_KEY = process.env.REACT_APP_RECIPE_API_KEY;
    const API_ID = process.env.REACT_APP_RECIPE_API_ID;

    const { data, isLoading, errorMessage } = useFetch(`https://api.edamam.com/api/recipes/v2?type=public&q=''&app_id=${API_ID}&app_key=${API_KEY}&ingr=4-12&mealType=${mealType}&cuisineType=${cuisineType}&random=true&field=label&field=image&field=images&field=source&field=url&field=yield&field=ingredientLines&field=calories&field=totalTime&field=cuisineType`)


    useEffect(() => {
        const scrollDiv = document.getElementById('scroll-recipes-id');
        if (scrollDiv) {
            scrollDiv.scrollTo(0, 0);
            adjustScrollArrows();
        }
    }, [cuisineType, mealType])

    function adjustScrollArrows() {

        const scrollDiv = document.getElementById('scroll-recipes-id');
        console.log(scrollDiv.scrollLeft);
        if (scrollDiv.scrollLeft <= 0) {

            document.getElementById('left-arrow-id').classList.add('disable');
        } else {
            document.getElementById('left-arrow-id').classList.remove('disable');
        }
        if (scrollDiv.scrollLeft >= scrollDiv.scrollWidth - scrollDiv.clientWidth) {
            document.getElementById('right-arrow-id').classList.add('disable');
        } else {
            document.getElementById('right-arrow-id').classList.remove('disable');
        }
    }

    function getNext() {
        const scrollDiv = document.getElementById('scroll-recipes-id');
        let scrollAmount = Math.floor(scrollDiv.clientWidth / PREVIEW_WIDTH) * PREVIEW_WIDTH;
        document.getElementById("scroll-recipes-id").scrollBy(scrollAmount, 0);
        adjustScrollArrows();
    }
    function getPrev() {
        const scrollDiv = document.getElementById('scroll-recipes-id');
        let scrollAmount = Math.floor(scrollDiv.clientWidth / PREVIEW_WIDTH) * PREVIEW_WIDTH;
        document.getElementById("scroll-recipes-id").scrollBy(-scrollAmount, 0);
        adjustScrollArrows();
    }
    return (
        <div className='recipe outer-recipe-container'>
            {errorMessage && <div>Recipe data is not available right now.  Please try back later.</div>}
            {isLoading && <div>Loading...</div>}
            <div className='filters'>
                <div className='filter-type-container'>
                    <label htmlFor="mealType" > Meal Type:</label >

                    <select name="mealType" id="mealTypeId" onChange={(e) => setMealType(e.target.value)}>
                        {mealTypeArray.map((entry, index) =>
                            <option key={index} value={entry.value}>{entry.label}</option>
                        )}
                    </select>
                </div>

                <div className='filter-type-container'>
                    <label htmlFor="cuisineType" > Cuisine Type:</label >

                    <select name="cuisineType" id="cuisineTypeId" onChange={(e) => setCuisineType(e.target.value)}>
                        {cuisineTypeArray.map((entry, index) =>
                            <option key={index} value={entry.value}>{entry.label}</option>
                        )}
                    </select>
                </div>
            </div>
            {data &&

                <div className='scrollable-container'>

                    <FontAwesomeIcon id='left-arrow-id' className='icon left-arrow disable ' icon={faAngleLeft} onClick={getPrev}></FontAwesomeIcon>

                    <div id='scroll-recipes-id' className='scrollable-list snaps-inline'>
                        {data.hits
                            .map((entry, index) =>
                                <RecipePreview index={index} label={entry.recipe.label} imageUrl={entry.recipe.images.SMALL.url} setCurrentIndex={setCurrentIndex} setShowRecipeCard={setShowRecipeCard} key={index}></RecipePreview>

                            )}
                    </div>
                    <FontAwesomeIcon id="right-arrow-id" className='icon right-arrow' icon={faAngleRight} onClick={getNext}></FontAwesomeIcon>

                </div>
            }
            {showRecipeCard && <RecipeCard details={data.hits[currentIndex].recipe} setShowRecipeCard={setShowRecipeCard} ></RecipeCard>}
        </div>

    )
}

export default ScrollRecipes
