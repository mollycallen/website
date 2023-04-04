const RecipeCard = ({ details, setShowRecipeCard }) => {

    return (
        <div className='recipe-card' id="recipe-id">
            <div className='btn-div'>
                <button className="close-btn" onClick={() => setShowRecipeCard(false)}>x</button>
            </div>
            <div className='top-half'>
                <img src={details.image} alt={details.label}></img>
                <div className='ingredients' >
                    <div className='recipe-name'>{details.label}</div>
                    <div className='recipe-sub'>
                        {details.totalTime > 0 && <div>Total Time: {details.totalTime} min</div>}
                        <div>Yields: {details.yield} servings</div>
                    </div>
                    {details.ingredientLines.map((entry, index) =>
                        <li className='ingredient-line' key={index}>{entry}</li>
                    )}</div>
            </div>
            <div className='bottom-half'>
                <div>
                    Click <a href={details.url} target='_blank' rel="noreferrer"><button className="btn here-btn">HERE</button></a> for recipe instructions.
                </div>


            </div>
        </div>
    )
}

export default RecipeCard
