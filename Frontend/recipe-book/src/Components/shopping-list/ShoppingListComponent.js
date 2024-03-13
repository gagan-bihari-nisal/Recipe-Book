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


    handleIngredientAdded = (ingredient) => {
        this.setState(prevState => ({
            ingredients: [...prevState.ingredients, ingredient]
        }));
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

                <hr className='col-lg-6 col-md-6 col-xs-9 col-sm-9 text-light' />

                <div className="row">
                    <div className="col-lg-10 col-md-10 col-xs-10 col-sm-12">
                        <ShoppingListEditComponent onIngredientAdded={this.handleIngredientAdded} />
                    </div>
                </div>

                <hr className='col-lg-6 col-md-6 col-xs-9 col-sm-9 text-light' />

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-xs-9 col-sm-9" style={{ height: '50vh', overflow: 'scroll' }}>
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
