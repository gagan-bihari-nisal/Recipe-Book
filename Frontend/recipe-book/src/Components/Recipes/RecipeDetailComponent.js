import React, { Component } from 'react'
import '../../Styles/RecipeDetailComponent.css';
export default class RecipeDetailComponent extends Component {

  render() {
    const { location } = this.props;
    const { recipe } = location.state;
    return (
      <>
        <div className="RecipeDetailComponent">

          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-xs-12">
              <img src={recipe.imagePath} className="img-responsive" alt={recipe.name} style={{ maxHeight: '300px' }} />

            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <h2 className='text-uppercase fw-bolder text-light'>{recipe.name}</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <h4 className="fs-5 text-uppercase fw-bolder text-light">
                Description
              </h4>
              <h2 className="fs-5  fw-lighter text-light">
                <i>{recipe.description}</i>
              </h2>
            </div>
          </div>

          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
              Manage
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <li><button class="dropdown-item" type="button">To Shopping List</button></li>
              <li><button class="dropdown-item" type="button">Edit Recipe</button></li>
              <li><button class="dropdown-item" type="button">Delete Recipe</button></li>
            </ul>
          </div>

          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-xs-12">
              <h4 className="fs-5 text-uppercase fw-bolder text-light">
                Ingredients
              </h4>
              <ul className="list-group">
                {recipe.ingredients.length > 0 &&
                  recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="list-group-item ">
                      <div>
                        <span class="badge rounded-pill">{index + 1}</span>
                        &nbsp;&nbsp;&nbsp;{ingredient}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <h4 className="fs-5 text-uppercase fw-bolder text-light">
                Procedure
              </h4>
              <ul className="list-group">
                {recipe.steps.length > 0 &&
                  recipe.steps.map((procedure, index) => (
                    <li key={index} className="list-group-item ">
                      <div>
                        <span class="badge rounded-pill ">Step {index + 1}</span>
                        &nbsp;&nbsp;&nbsp;{procedure}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>




      </>
    )
  }
}
