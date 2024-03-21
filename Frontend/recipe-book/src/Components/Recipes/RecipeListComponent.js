import React, { Component } from 'react'
import '../../Styles/RecipeListComponent.css'
import RecipeItemComponent from './RecipeItemComponent';
import { store } from '../../Store/Store';
import RecipeService from '../../Services/RecipeService';
import { connect } from 'react-redux';
import { fetchRecipesSuccess } from '../../Store/Recipes/RecipeActions';
class RecipeListComponent extends Component {

  componentDidMount() {
    const { fetchRecipesSuccess } = this.props;
    const recipeService = new RecipeService(store);
    recipeService.getAllRecipes()
      .then(res => {
        fetchRecipesSuccess(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { recipes } = this.props.recipes;

    return (
      <>
        <div className="RecipeListComponent" >
          <hr />
          <div className="row" style={{ maxHeight: '70vh', overflow: 'scroll' }}>
            <div className="col-xs-12">
              {recipes.length > 0 ? recipes.map((recipeEl, i) => (
                <RecipeItemComponent key={i} recipe={recipeEl} id={recipeEl.id} />
              )) : <h5 className='text-white text-center fst-italic'>
                Add something            </h5>}
            </div>
          </div>
        </div>

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.recipes
});

const mapDispatchToProps = {
  fetchRecipesSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListComponent);
