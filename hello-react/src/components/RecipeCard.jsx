import React from 'react';
import './RecipeCard.css';
import RECIPE_IMAGE from '../assets/pancake.png';
import { RECIPE } from './recipe-data';

const RecipeCard = () => {
    return (
        <div className="card">
            <img src={RECIPE_IMAGE} alt="pancakes" />
            <div className="recipe-info">
            <h2>{RECIPE.title}</h2> 
                <div className="content">
                    <div className="ingredients">  
                        <h3>Ingredients</h3>
                        <ul>
                            {RECIPE.ingredients.map((ingredient, index) => (
                                <li className="ingredient"> 
                                   {ingredient} 
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="instructions"> 
                        <h3>Instructions</h3>
                        <ul>
                        {RECIPE.instructions.map((instruction, index) => (
                                <li className="ingredient"> 
                                    {instruction} 
                                </li>
                            ))} 
                        </ul>
                    </div>  
                </div>
            </div>
        </div> 
    )
}

export default RecipeCard;


