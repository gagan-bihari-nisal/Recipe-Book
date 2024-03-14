import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRecipesSuccess } from '../../Store/Recipes/RecipeActions'
class RecipeEditComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.params.id,
      editMode: this.props.params.id === null ? false : true
    }
  }

  componentDidMount() {

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {

  }
  render() {
    const { recipes } = this.props.recipes;
    const recipe = recipes.filter(recipe => recipe.id === parseInt(this.state.id))[0];
    return (
      <div className="RecipeEditComponent">
        <div className="row">
          <div className="col-xs-12">
            <form onSubmit={this.handleSubmit}>
              <div className="row my-3">
                <div className="col-xs-12">
                  <button className="btn btn-success me-3" type="submit">Save</button>
                  <button className="btn btn-danger" type="button">Cancel</button>
                </div>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bi bi-cake text-light" style={{ fontSize: "20px" }}></i>
                </span>
                <div className="form-floating">
                  <input type="text" className="form-control" id="name" name="name"
                    onChange={this.handleChange}
                    placeholder='Recipe Name' />
                  <label htmlFor="name">Recipe Name</label>
                </div>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bi bi-cake text-light" style={{ fontSize: "20px" }}></i>
                </span>
                <div className="form-floating">
                  <input type="text" className="form-control" id="description" name="description"
                    onChange={this.handleChange}
                    placeholder='Recipe Description' />
                  <label htmlFor="description">Recipe Description</label>
                </div>
              </div>


              <div class="input-group mb-3">
                <label class="input-group-text" for="imageFile">Recipe Image</label>
                <input type="file" className="form-control" style={{ fontSize: '17px' }} id="imageFile" name="imageFile"
                  onChange={this.handleChange}
                  placeholder='Recipe Image' />
              </div>

              <hr className='text-white' />
              <div className="row">
                <div className="col-xs-12">
                  {recipe.ingredients.map(ingredient => {
                    return <div className="input-group my-3">
                      <span className="input-group-text">
                        <i className="bi bi-cake text-light" style={{ fontSize: "20px" }}></i>
                      </span>
                      <div className="form-floating">
                        <input type="text" className="form-control" id="ingredients" name="ingredients"
                          onChange={this.handleChange}
                          value={ingredient.ingredientName}
                          placeholder='Recipe Ingredient' />
                        <label htmlFor="ingredients">Recipe Ingredient</label>

                      </div>
                      <button class="btn btn-danger" type="button" id="button-addon2">X</button>
                    </div>
                  })}
                </div>
              </div>
              <button class="btn btn-success" type="button" id="button-addon2">Add Ingredient</button>
              <hr className='text-white' />

              <div className="row">
                <div className="col-xs-12">
                  {recipe.steps.map(step => {
                    return <div className="input-group my-3">
                      <span className="input-group-text">
                        <i className="bi bi-cake text-light" style={{ fontSize: "20px" }}></i>
                      </span>
                      <div className="form-floating">
                        <input type="text" className="form-control" id="steps" name="steps"
                          onChange={this.handleChange}
                          value={step.step}
                          placeholder='Recipe Ingredient' />
                        <label htmlFor="ingredients">Recipe Procedure</label>
                      </div>
                      <button class="btn btn-danger" type="button" id="button-addon2">X</button>
                    </div>
                  })}
                </div>
              </div>
              <button class="btn btn-success" type="button" id="button-addon2">Add Next Step</button>
              <hr className='text-white' />

            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  recipes: state.recipes
});

const mapDispatchToProps = {
  fetchRecipesSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEditComponent);
