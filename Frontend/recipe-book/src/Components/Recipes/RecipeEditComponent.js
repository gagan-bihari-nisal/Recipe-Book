import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../Styles/RecipeEditComponent.css'
class RecipeEditComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.params.id,
      editMode: this.props.params.id === null ? false : true,
      name: '',
      description: '',
      imageFile: '',
      ingredients: [],
      steps: [],
    }
  }

  componentDidMount() {
    if (this.state.editMode) {
      const { recipes } = this.props.recipes;
      const recipe = recipes.filter(recipe => recipe.id === parseInt(this.state.id))[0];
      this.setState({
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        imageFile: recipe.imageFile,
      })
    }
  }

  handleChange = (event, index, type) => {
    const { name, value } = event.target;
    if (type === 'ingredient') {
      const updatedIngredients = [...this.state.ingredients];
      updatedIngredients[index] = { ...updatedIngredients[index], [name]: value };
      this.setState({ ingredients: updatedIngredients });
    } else if (type === 'step') {
      const updatedSteps = [...this.state.steps];
      updatedSteps[index] = { ...updatedSteps[index], [name]: value };
      this.setState({ steps: updatedSteps });
    } else {
      this.setState({ [name]: value });
    }
  }


  handleSubmit = (event) => {
    event.preventDefault();
  }

  addIngredient = (event) => {
    const updatedIngredients = [...this.state.ingredients];
    updatedIngredients.push({});
    this.setState({ ingredients: updatedIngredients });
  }

  addStep = (event) => {
    const updatedSteps = [...this.state.steps];
    updatedSteps.push({});
    this.setState({ steps: updatedSteps });
  }

  deleteIngredient = (index) => {
    const updatedIngredients = [...this.state.ingredients];
    updatedIngredients.splice(index, 1);
    this.setState({ ingredients: updatedIngredients });
  }

  deleteStep = (index) => { 
    const updatedSteps = [...this.state.steps];
    updatedSteps.splice(index, 1);
    this.setState({ steps: updatedSteps });
  }
  render() {
    const { name, description, ingredients, steps, imageFile } = this.state;
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
                    placeholder='Recipe Name'
                    value={name} />
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
                    value={description}
                    placeholder='Recipe Description' />
                  <label htmlFor="description">Recipe Description</label>
                </div>
              </div>


              <div className="input-group mb-3">
                <label className="input-group-text" for="imageFile">Recipe Image</label>
                <input type="file" className="form-control" style={{ fontSize: '17px' }} id="imageFile" name="imageFile"
                  onChange={this.handleChange}
                  placeholder='Recipe Image' />
              </div>

              <hr className='text-white' />
              <div className="row">
                <div className="col-xs-12">
                  {ingredients.map((ingredient, index) => {
                    return <div className="input-group my-3">
                      <span className="input-group-text">
                        <i className="bi bi-cake text-light" style={{ fontSize: "20px" }}></i>
                      </span>
                      <div className="form-floating">
                        <input type="text" className="form-control" id={`ingredient-${index}`} name="ingredientName"
                          onChange={(e) => this.handleChange(e, index, 'ingredient')}
                          value={ingredient.ingredientName}
                          placeholder='Recipe Ingredient' />

                        <label htmlFor="ingredients">Recipe Ingredient</label>

                      </div>
                      <button className="btn btn-danger" onClick={() => this.deleteIngredient(index)} type="button" id="button-addon2">X</button>
                    </div>
                  })}
                </div>
              </div>
              <button className="btn btn-success" type="button" id="button-addon2" onClick={this.addIngredient}>Add Ingredient</button>
              <hr className='text-white' />

              <div className="row">
                <div className="col-xs-12">
                  {steps.map((step,index) => {
                    return <div className="input-group my-3">
                      <span className="input-group-text">
                        <i className="bi bi-cake text-light" style={{ fontSize: "20px" }}></i>
                      </span>
                      <div className="form-floating">
                        <input type="text" className="form-control" id={`step-${index}`} name="step"
                          onChange={(e) => this.handleChange(e, index, 'step')}
                          value={step.step}
                          placeholder='Recipe Procedure' />

                        <label htmlFor="ingredients">Recipe Procedure</label>
                      </div>
                      <button className="btn btn-danger" type="button" onClick={() => this.deleteStep(index)}id="button-addon2">X</button>
                    </div>
                  })}
                </div>
              </div>
              <button className="btn btn-success" type="button"  onClick={this.addStep}id="button-addon2">Add Next Step</button>
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

export default connect(mapStateToProps)(RecipeEditComponent);
