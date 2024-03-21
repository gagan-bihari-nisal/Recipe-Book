import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../Styles/RecipeItemComponent.css';
export default class RecipeItemComponent extends React.Component {
  render() {
    const { recipe, id } = this.props;

    if (recipe.image) {
      const indexOfPublic = recipe.image.indexOf('public');
      if (indexOfPublic > 0)
        recipe.image = recipe.image.substring(indexOfPublic).substring(6);
    }

    return (
      <div className="RecipeItemComponent">
        <NavLink to={`/recipes/${id}`}
          state={{ recipe: recipe }} className="list-group-item clearfix"  >
          <div className="row my-1 mx-1 p-1">
            <div className="col-8">
              <h4 className="list-group-item-heading text-capitalize">{recipe.name}</h4>
              <p className="list-group-item-text">{recipe.description}</p>
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center">
              <img src={recipe.image} alt={recipe.name}
                className="img-fluid"
                style={{ maxWidth: "100%", height: "auto", maxHeight: "50px" }}
              />
            </div>
          </div>
        </NavLink>
      </div>
    );
  }
}