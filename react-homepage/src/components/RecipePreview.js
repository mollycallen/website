import React from 'react'

const RecipePreview = ({ index, label, imageUrl, setCurrentIndex, setShowRecipeCard }) => {
    return (
        <div className="recipe-preview"
            onClick={() => {
                setCurrentIndex(index);
                setShowRecipeCard(true);
            }}>
            <img alt={label} src={imageUrl}></img>
            <p>{label}</p>
        </div>

    )
}

export default RecipePreview
