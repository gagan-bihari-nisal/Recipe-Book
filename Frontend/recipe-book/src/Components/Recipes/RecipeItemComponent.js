import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../Styles/RecipeItemComponent.css';

export default class RecipeItemComponent extends React.Component {
  render() {
    const { recipe, index } = this.props;

    return (
      <div className="RecipeItemComponent">
        <NavLink to={`/recipes/${index}`}
          state={{ recipe: recipe }} className="list-group-item clearfix"  >
          <div className="row my-1 mx-1 p-1">
            <div className="col-10">
              <h4 className="list-group-item-heading">{recipe.name}</h4>
              <p className="list-group-item-text">{recipe.description}</p>
            </div>
            <div className="col-2 d-flex justify-content-center align-items-center">
              <img src={recipe.imagePath} alt={recipe.name} className="img-responsive" />
            </div>
          </div>
        </NavLink>
      </div>
    );
  }
}