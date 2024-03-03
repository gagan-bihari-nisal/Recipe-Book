import React, { Component } from 'react'
import '../../Styles/RecipeListComponent.css'
import RecipeItemComponent from './RecipeItemComponent';
export default class RecipeListComponent extends Component {

  render() {
    const recipes = [
      { name: "Recipe 1", description: "desc 1", imagePath: "https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1571_2_1437661403.jpg?tr=w-800,h-1066", ingredients: ["ing1", "ing 2"], steps: ["step 1", "step 2"] },
      { name: "Recipe 2", description: "desc 2", imagePath: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/08/chole-recipe.jpg", ingredients: ["ing1", "ing 2"], steps: ["step 1", "step 2"] }
    ];

    return (
      <>
        <div className="RecipeListComponent">
          <div className="row">
            <div className="col-xs-12">
              <div className="btn btn-add">Add New Recipe</div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-xs-12">
              {recipes.map((recipeEl, i) => (
                <RecipeItemComponent key={i} recipe={recipeEl} index={i} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

