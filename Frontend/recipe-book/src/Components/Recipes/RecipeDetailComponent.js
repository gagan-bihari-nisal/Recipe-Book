import React, { Component } from 'react'
import '../../Styles/RecipeDetailComponent.css';
import { store } from '../../Store/Store';
import RecipeService from '../../Services/RecipeService';
import { ToastContainer, toast } from 'react-toastify';
import { deleteRecipeSuccess } from '../../Store/Recipes/RecipeActions';
import { connect } from 'react-redux';
class RecipeDetailComponent extends Component {

  constructor(props) {
    super(props)
  }

  addToShoppingList(recipeId) {
    const recipeService = new RecipeService(store)
    console.log("working")
    recipeService.addIngredientsToShoppingListByRecipeId(recipeId)
      .then(res => {
        toast.success("Ingredients added to shopping list")
      })
      .catch(error => {
        toast.error("Something went wrong")
      })
  }

  deleteRecipe(recipeId) {
    const recipeService = new RecipeService(store)
    const { deleteRecipeSuccess } = this.props
    recipeService.deleteRecipe(recipeId)
      .then(res => {
        toast.success("Recipe deleted")
        deleteRecipeSuccess(recipeId)
        this.props.navigate(-1)
      })
      .catch(error => {
        toast.error("Something went wrong")
      })
  }

  editRecipe(recipeId) {  
    this.props.navigate(`edit`)
  }


  render() {
    const { location } = this.props;
    const { recipe } = location.state;
    return (
      <>
        <div className="RecipeDetailComponent">
          <ToastContainer />
          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-xs-12">
              <img src={recipe.image} className="img-responsive text-light" alt={recipe.name} style={{ maxHeight: '300px' }} />

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

          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
              Manage
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <li><button className="dropdown-item" type="button" onClick={() => this.addToShoppingList(recipe.id)}>To Shopping List</button></li>
              <li><button className="dropdown-item" type="button" onClick={()=>this.editRecipe(recipe.id)}>Edit Recipe</button></li>
              <li><button className="dropdown-item" type="button" onClick={() => this.deleteRecipe(recipe.id)}>Delete Recipe</button></li>
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
                        <span className="badge rounded-pill">{index + 1}</span>
                        &nbsp;&nbsp;&nbsp;{ingredient.ingredientName}
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
                        <span className="badge rounded-pill ">Step {index + 1}</span>
                        &nbsp;&nbsp;&nbsp;{procedure.step}
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



const mapStateToProps = (state) => ({
  recipes: state.recipes
});

const mapDispatchToProps = {
  deleteRecipeSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailComponent);
