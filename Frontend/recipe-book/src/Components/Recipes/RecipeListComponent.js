import React, { Component } from 'react'
import '../../Styles/RecipeListComponent.css'
import RecipeItemComponent from './RecipeItemComponent';
import store from '../../Store/Store';
import RecipeService from '../../Services/RecipeService';
export default class RecipeListComponent extends Component {

  constructor(props) {
    super(props);
    this.state = (
      {
        recipes: []
      }
    )
  }
  componentDidMount() {
    const recipeService = new RecipeService(store);
    recipeService.getAllRecipes().then(res => {
      this.setState({ recipes: res.data })
      console.log(this.state.recipes);
    }).catch(error => {
      console.log(error);
    })

  }
  render() {

   // const { recipes } = this.props

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
              {this.state.recipes.map((recipeEl, i) => (
                <RecipeItemComponent key={i} recipe={recipeEl} id={recipeEl.id} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

