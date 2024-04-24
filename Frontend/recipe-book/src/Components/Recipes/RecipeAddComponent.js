import React, { Component } from 'react'
import '../../Styles/RecipeAddComponent.css'
import { store } from '../../Store/Store'
import RecipeService from '../../Services/RecipeService'
import { addRecipeSuccess } from '../../Store/Recipes/RecipeActions'
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
import { LinearProgress } from '@mui/material';

class RecipeAddComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            imageFile: null,
            ingredients: [],
            steps: [],
            isAdding: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const recipeService = new RecipeService(store)

        const formData = new FormData();
        const state = this.state;
        formData.append('name', state.name);
        formData.append('description', state.description);

        const ingredientNames = state.ingredients.map(ingredient => ingredient.ingredientName);
        formData.append('ingredients', (ingredientNames));

        const steps = state.steps.map(s => s.step);
        formData.append('steps', (steps));
        if (state.imageFile) {
            formData.append('imageFile', state.imageFile);
        }
        this.setState({ isAdding: true });
        recipeService.addRecipe(formData)
            .then(response => {
                toast.success("Recipe added successfully")
                this.props.addRecipeSuccess(response.data);
                this.props.navigate('/recipes/')
            })
            .catch(error => {
                if (error.response) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error("Something went wrong")
                }
            }).finally(() => {
                this.setState({ isAdding: false });
            });

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
        } else if (name === 'imageFile') {
            this.setState({ imageFile: event.target.files[0] });
        } else {
            this.setState({ [name]: value });
        }
    }

    handleCancel = () => {
        this.props.navigate(-1)
    }

    render() {
        const { name, description, ingredients, steps } = this.state;
        return (
            <div className="RecipeEditComponent">
                {this.state.isAdding && <LinearProgress />}
                <div className="row">
                    <div className="col-xs-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row my-3">
                                <div className="col-xs-12">
                                    <button className="btn btn-success me-3" disabled={this.state.isAdding} >
                                        Add New Recipe
                                    </button>
                                    <button className="btn btn-danger" type="button" onClick={this.handleCancel}>Cancel</button>
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
                                        value={name} required />
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
                                        placeholder='Recipe Description' required />
                                    <label htmlFor="description">Recipe Description</label>
                                </div>
                            </div>


                            <div className="input-group mb-3">
                                <label className="input-group-text" htmlFor="imageFile">Recipe Image</label>
                                <input type="file" className="form-control" style={{ fontSize: '17px' }} id="imageFile" name="imageFile"
                                    onChange={this.handleChange}
                                    placeholder='Recipe Image' required />
                            </div>

                            <hr className='text-white' />
                            <div className="row">
                                <div className="col-xs-12">
                                    {ingredients.map((ingredient, index) => {
                                        return <div className="input-group my-3" key={index}>
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
                                    {steps.map((step, index) => {
                                        return <div className="input-group my-3" key={index}>
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
                                            <button className="btn btn-danger" type="button" onClick={() => this.deleteStep(index)} id="button-addon2">X</button>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <button className="btn btn-success" type="button" onClick={this.addStep} id="button-addon2">Add Next Step</button>
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

const mapDispatchToProps = (dispatch) => ({
    addRecipeSuccess: (newRecipe) => dispatch(addRecipeSuccess(newRecipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeAddComponent);
