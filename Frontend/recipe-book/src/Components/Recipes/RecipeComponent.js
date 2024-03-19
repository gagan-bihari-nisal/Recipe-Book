import React, { Component } from 'react';
import RecipeListComponent from './RecipeListComponent';
import { Outlet } from 'react-router-dom';
import '../../Styles/RecipeComponent.css'
export default class RecipeComponent extends Component {

    constructor(props) {
        super(props);
    }

    handleAddNewRecipe = () => {
        this.props.navigate('new')
    }
    render() {

        return (
            <>
                <div className="RecipeComponent">
                    <div className="row mx-2 mt-3">
                        <div className="col-xs-12">
                            <div className="btn btn-add" onClick={this.handleAddNewRecipe}>Add New Recipe</div>
                        </div>
                    </div>
                    <div className="row mx-2 my-1">
                        <div className="col-md-5">
                            <RecipeListComponent />
                        </div>
                        <div className="col-md-7">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
