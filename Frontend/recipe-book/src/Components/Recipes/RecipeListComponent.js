import React, { Component } from 'react'
import '../../Styles/RecipeListComponent.css'
import RecipeItemComponent from './RecipeItemComponent';
export default class RecipeListComponent extends Component {

  handleRecipeClick = (index) => {
    this.props.onRecipeClick(index);
  };
  render() {
    const recipes = [
      { name: "Recipe 1", description: "desc 1", imagePath: "https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1571_2_1437661403.jpg?tr=w-800,h-1066" },
      { name: "Recipe 2", description: "desc 2", imagePath: "https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1571_2_1437661403.jpg?tr=w-800,h-1066" }
    ];

    return (
      <>
        <div className="row">
          <div className="col-xs-12">
            <div className="btn btn-add">Add New Recipe</div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-xs-12">
            {recipes.map((recipe, index) => (
              <RecipeItemComponent
                key={index}
                index={index}
                recipe={recipe}
                onClick={this.handleRecipeClick}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

