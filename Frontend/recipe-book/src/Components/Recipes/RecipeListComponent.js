import React, { Component } from 'react'
import '../../Styles/RecipeListComponent.css'
import RecipeItemComponent from './RecipeItemComponent';
import { store } from '../../Store/Store';
import RecipeService from '../../Services/RecipeService';
import { connect } from 'react-redux';
import { fetchRecipesSuccess } from '../../Store/Recipes/RecipeActions';
class RecipeListComponent extends Component {

  constructor(props) {
    super(props);
  }
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
          <div className="row" style={{ height: '70vh', overflow: 'scroll' }}>
            <div className="col-xs-12">
              {recipes.map((recipeEl, i) => (
                <RecipeItemComponent key={i} recipe={recipeEl} id={recipeEl.id} />
              ))}
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
