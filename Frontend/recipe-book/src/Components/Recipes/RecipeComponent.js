import React, { Component } from 'react';
import RecipeDetailComponent from './RecipeDetailComponent';
import RecipeStartComponent from './RecipeStartComponent';
import RecipeListComponent from './RecipeListComponent';
import { Outlet } from 'react-router-dom';

export default class RecipeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRecipeIndex: null
        };
    }

    handleRecipeClick = (index) => {
        this.setState({ selectedRecipeIndex: index });
        console.log(index);
    };

    render() {
        const recipes = [
            { name: "Recipe 1", description: "desc 1", imagePath: "imagepath 1" },
            { name: "Recipe 2", description: "desc 2", imagePath: "imagepath 2" }
        ];

        const { selectedRecipeIndex } = this.state;

        return (
            <div className="row mx-2 my-4">
                <div className="col-md-5">
                    <RecipeListComponent />
                </div>
                <div className="col-md-7">
                    <Outlet />
                </div>
            </div>
        );
    }
}
