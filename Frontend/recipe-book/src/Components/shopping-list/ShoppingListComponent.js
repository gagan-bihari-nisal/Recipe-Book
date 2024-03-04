import React, { Component } from 'react'
import ShoppingListEditComponent from './ShoppingListEditComponent'
import '../../Styles/ShoppingListComponent.css'
export default class ShoppingListComponent extends Component {
    render() {
        const ingredients = ["ingre 1","ingre 2", "ingre 3"]
        return (
            <div className="ShoppingListComponent p-4">
                <div className="row">
                    <div className="col-lg-10 col-md-10 col-xs-10 col-sm-12">
                        <ShoppingListEditComponent/>
                    </div>
                </div>
                <div className="row">
                <div className="col-lg-6 col-md-6 col-xs-9 col-sm-9">
                    <hr  className='text-light'/>
                        <ul className="list-group">
                            {ingredients.map((ingredient, idx) => (
                                <li key={idx} className="list-group-item" style={{ cursor: 'pointer' }}>
                                    {ingredient}           
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            
            </div>
        )
    }
}
