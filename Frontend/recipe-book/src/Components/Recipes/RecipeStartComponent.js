import React, { Component } from 'react'

import { connect } from 'react-redux';
import { fetchRecipesSuccess } from '../../Store/Recipes/RecipeActions';
class RecipeStartComponent extends Component {
  render() {
    const { recipes } = this.props.recipes;
    return (
      <>
        <div className="RecipeStartComponent">
        
         {recipes.length>0 ? <div className="text-white">Please select something</div>: <></>}
        </div>
      </>
    )
  }
}


const mapStateToProps = (state) => ({
  recipes: state.recipes
});

const mapDispatchToProps = {
  fetchRecipesSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeStartComponent);

