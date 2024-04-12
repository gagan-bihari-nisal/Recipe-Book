import React, { Component } from 'react'
import RecipeService from '../Services/RecipeService';
import { store } from '../Store/Store';
export default class MyFeedComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            showDetails: -1, // Add this line
            searchQuery: ''
        };
    }

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    }
    handleExpandClick = (index) => {
        this.setState(prevState => ({ showDetails: prevState.showDetails === index ? -1 : index }));
    };

    componentDidMount() {
        const recipeService = new RecipeService(store);
        recipeService.getOtherRecipes()
            .then((response) => {
                // response data contains recipe image and it needs to be modified to display the image
                const recipes = response.data.map((recipe) => {
                    if (recipe.image) {
                        const indexOfPublic = recipe.image.indexOf('public');
                        if (indexOfPublic > 0)
                            recipe.image = recipe.image.substring(indexOfPublic).substring(6);
                    }
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
                <div className="container-fluid my-3" style={{ width: "500px" }}>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="searchQuery" name="searchQuery"
                            value={this.state.searchQuery}
                            placeholder='Search Recipes'
                            onChange={this.handleSearchChange}
                        />
                        <label htmlFor="searchQuery">Search Recipes</label>
                    </div>
                </div>

                {filteredRecipes.map((recipe, index) => {
                    return (
                        <div className="container-fluid my-3 bg-light" style={{ width: "500px" }}>
                            <div className="row">
                                <div className="col text-white">
                                    <img src={recipe.image} alt="" style={{ height: '200px', width: '200px', padding: "10px" }} />
                                </div>
                                <div className="col p-2">
                                    <h2 className='text-uppercase fw-bolder text-dark'>{recipe.name}</h2>
                                    <h2 className="fs-5  fw-lighter text-dark">
                                        <i>{recipe.description}</i>
                                    </h2>
                                </div>

                            </div>
                            <p ><small class="text-muted">Uploaded By: @{recipe.username}</small></p>
                            <div className="row">
                                <div className="col  d-flex justify-content-center align-items-center hover-effect
hover-effect" style={{
                                    cursor: "pointer",
                                    bottom: "0%", right: "50%",
                                    backgroundColor: "darkcyan"

                                }} onClick={() => this.handleExpandClick(index)}>
                                    {this.state.showDetails === index
                                        ? <i className='bi bi-chevron-up fs-5 text-white '></i>
                                        : <i className='bi bi-chevron-down fs-5 text-white '></i>
                                    }
                                </div>
                            </div>

                            <div className="row">
                                {this.state.showDetails === index && (
                                    <div className="card text-dark bg-light">
                                        {recipe.ingredients.length > 0 && <h4 className="fs-5 text-uppercase fw-bolder text-dark">
                                            Ingredients
                                        </h4>}
                                        <ul className="list-group">
                                            {recipe.ingredients.length > 0 &&
                                                recipe.ingredients.map((ingredient, index) => (
                                                    <li key={index} className="list-group-item ">
                                                        <div>
                                                            <span className="badge rounded-pill bg-dark">{index + 1}</span>
                                                            &nbsp;&nbsp;&nbsp;{ingredient.ingredientName}
                                                        </div>
                                                    </li>
                                                ))}
                                        </ul>
                                        {recipe.steps.length > 0 && <h4 className="fs-5 text-uppercase fw-bolder text-dark">
                                            Procedure
                                        </h4>}
                                        <ul className="list-group">
                                            {recipe.steps.length > 0 &&
                                                recipe.steps.map((procedure, index) => (
                                                    <li key={index} className="list-group-item ">
                                                        <div>
                                                            <span className="badge rounded-pill bg-dark ">Step {index + 1}</span>
                                                            &nbsp;&nbsp;&nbsp;{procedure.step}
                                                        </div>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                        </div>
                    )
                })}
            </>
        )
    }
}