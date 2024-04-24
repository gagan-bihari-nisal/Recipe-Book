import React, { Component } from 'react'
import ShoppingListEditComponent from './ShoppingListEditComponent'
import '../../Styles/ShoppingListComponent.css'
import ShoppingListService from '../../Services/ShoppingListService'
import { store } from '../../Store/Store'
import { connect } from 'react-redux'
import { fetchIngredientsSuccess } from '../../Store/ShoppingList/ShoppingListActions'
class ShoppingListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = (
            {
                ingredients: [],
                selectedIngredient: null,
            }
        )
    }

    handleItemClick = (ingredient) => {
        this.setState({
            selectedIngredient: ingredient
        });
    }

    componentDidMount() {
        const shoppingListService = new ShoppingListService(store);
        shoppingListService.getAllIngredients().then(res => {
            this.setState({ ingredients: res.data })
            this.props.fetchIngredientsSuccess(res.data)
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        const { selectedIngredient } = this.state
        const { ingredients } = this.props.ingredients;
        return (
            <div className="ShoppingListComponent p-4">
                <hr className='col-lg-6 col-md-6 col-xs-9 col-sm-9 text-light' />
                <div className="row">
                    <div className="col-lg-10 col-md-10 col-xs-10 col-sm-12">
                        <ShoppingListEditComponent
                            selectedIngredient={selectedIngredient}
                        />
                    </div>
                </div>
                <hr className='col-lg-6 col-md-6 col-xs-9 col-sm-9 text-light' />
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-xs-9 col-sm-9" style={{ maxHeight: '50vh', overflow: 'auto' }}>
                        <ul className="list-group">
                            {ingredients.map((ingredient, idx) => (
                                <li key={idx} className="list-group-item text-capitalize" style={{ cursor: 'pointer' }}
                                    onClick={() => this.handleItemClick(ingredient)}
                                >
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

const mapStateToProps = (state) => ({
    ingredients: state.shoppingList
});

const mapDispatchToProps = {
    fetchIngredientsSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListComponent);
