import React, { Component } from 'react'
import RecipeService from '../Services/RecipeService';
import { store } from '../Store/Store';
export default class MyFeedComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            searchQuery: ''
        };
    }

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    }

    componentDidMount() {
        const recipeService = new RecipeService(store);
        recipeService.getOtherRecipes()
            .then((response) => {
                const recipes = response.data.map((recipe) => {
                    return recipe;
                });
                this.setState({ recipes: recipes });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        const filteredRecipes = this.state.recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
        );
        return (
            <>
                <div className="container my-3" style={{ maxWidth: "70%" }}>
                    <div className="row">
                        <div className="col-12 mx-auto">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="searchQuery"
                                    name="searchQuery"
                                    value={this.state.searchQuery}
                                    placeholder='Search Recipes'
                                    onChange={this.handleSearchChange}
                                />
                                <label htmlFor="searchQuery">Search Recipes</label>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    filteredRecipes.length === 0 &&
                    <div className="container my-3 d-flex flex-column justify-content-center align-items-center" style={{ height: "50vh" }}>
                        <i className="bi bi-emoji-frown text-light mb-3" style={{ fontSize: "5rem" }}></i>
                        <h2 className="fs-5 text-uppercase fw-bolder text-light">
                            No recipes found
                        </h2>
                    </div>
                }
                {filteredRecipes.map((recipe, index) => {
                    return (
                        <div className="container my-3 bg-dark text-light">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <img src={recipe.image} alt={recipe.name} className="img-fluid rounded" style={{ padding: "10px" }} />
                                </div>
                                <div className="col-12 col-md-6 px-3">
                                    <h2 className='text-uppercase fw-bolder text-light'>{recipe.name}</h2>
                                    <h2 className="fs-5 fw-lighter text-light">
                                        <i>{recipe.description}</i>
                                    </h2>
                                </div>
                            </div>
                            <p><small class="px-2 text-secondary">Uploaded By: @{recipe.username}</small></p>
                            <div className="accordion accordion-flush rounded pb-2 px-2" id="accordionParent">
                                <div className="accordion-item">
                                    <h3 className="accordion-header" id={`heading${index}`}>
                                        <button className="accordion-button collapsed bg-secondary text-light" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                                            More Details
                                        </button>
                                    </h3>
                                    <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionParent">
                                        <div className="accordion-body bg-dark text-light">
                                            {recipe.ingredients.length > 0 && <h4 className="fs-5 text-uppercase fw-bolder text-light">
                                                Ingredients
                                            </h4>}
                                            <ul className="list-group">
                                                {recipe.ingredients.length > 0 &&
                                                    recipe.ingredients.map((ingredient, index) => (
                                                        <li key={index} className="list-group-item bg-dark text-light">
                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <span className="badge rounded-pill bg-light text-dark">{index + 1}</span>
                                                                </div>
                                                                <div className="col-10">
                                                                    {ingredient.ingredientName}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                            </ul>
                                            {recipe.steps.length > 0 && <h4 className="fs-5 text-uppercase fw-bolder my-2 text-light">
                                                Procedure
                                            </h4>}
                                            <ul className="list-group">
                                                {recipe.steps.length > 0 &&
                                                    recipe.steps.map((procedure, index) => (
                                                        <li key={index} className="list-group-item bg-dark text-light">
                                                            <div className="row">
                                                                <div className="col-3">
                                                                    <span className="badge rounded-pill bg-light text-dark">Step {index + 1}</span>
                                                                </div>
                                                                <div className="col-9">
                                                                    {procedure.step}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }
}