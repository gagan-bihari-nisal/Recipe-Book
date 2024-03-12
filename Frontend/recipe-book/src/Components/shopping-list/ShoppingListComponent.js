import React, { Component } from 'react'
import ShoppingListEditComponent from './ShoppingListEditComponent'
import '../../Styles/ShoppingListComponent.css'
import ShoppingListService from '../../Services/ShoppingListService'
import { store } from '../../Store/Store'
export default class ShoppingListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = (
            {
                ingredients: [],
            }
        )
    }

    componentDidMount() {
        const shoppingListService = new ShoppingListService(store);
        shoppingListService.getAllIngredients().then(res => {
            this.setState({ ingredients: res.data })
        }).catch(error => {
            console.log(error);
        })
    }
    render() {
        const { ingredients } = this.state
        return (
            <div className="ShoppingListComponent p-4">
                <div className="row">
                    <div className="col-lg-10 col-md-10 col-xs-10 col-sm-12">
                        <ShoppingListEditComponent />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-xs-9 col-sm-9">
                        <hr className='text-light' />
                        <ul className="list-group">
                            {ingredients.map((ingredient, idx) => (
                                <li key={idx} className="list-group-item text-capitalize" style={{ cursor: 'pointer' }}>
                                    {ingredient.ingredientName}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}
