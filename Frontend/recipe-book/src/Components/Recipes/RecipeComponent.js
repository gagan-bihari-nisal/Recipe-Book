import React, { Component } from 'react';
import RecipeListComponent from './RecipeListComponent';
import { Outlet } from 'react-router-dom';

export default class RecipeComponent extends Component {


    render() {

        return (
            <>
                <div className="RecipeComponent">
                    <div className="row mx-2 my-4">
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
