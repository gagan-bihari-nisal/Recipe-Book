import React, { Component } from 'react'
import ShoppingListService from '../../Services/ShoppingListService';
import { store } from '../../Store/Store'
import { connect } from 'react-redux';
import { addIngredientSuccess, deleteIngredientSuccess } from '../../Store/ShoppingList/ShoppingListActions';
import { updateIngredientSuccess } from '../../Store/ShoppingList/ShoppingListActions';
import { ToastContainer, toast } from 'react-toastify';

class ShoppingListEditComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.selectedIngredient ? props.selectedIngredient.ingredientName : '',
            editMode: props.selectedIngredient ? true : false
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.selectedIngredient !== prevProps.selectedIngredient) {
            this.setState({
                name: this.props.selectedIngredient ? this.props.selectedIngredient.ingredientName : '',
                editMode: this.props.selectedIngredient ? true : false
            });
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const shoppingListService = new ShoppingListService(store)
        if (this.state.editMode) {
            const id = this.props.selectedIngredient.id
            shoppingListService.updateIngredient(id, this.state.name)
                .then(res => {
                    this.props.updateIngredientSuccess(id, res.data)
                    this.setState({ name: '', editMode: false })
                    toast.success("Ingredient updated successfully")
                })
                .catch(error => {
                    toast.error("Something went wrong")
                    this.setState({ name: '', editMode: false })
                    console.log(error)
                })
        } else {
            shoppingListService.addIngredient(this.state.name)
                .then(res => {
                    this.props.addIngredientSuccess(res.data)
                    this.setState({ name: '' })
                    toast.success("Ingredient added successfully")
                })
                .catch(error => {
                    toast.error("Something went wrong")
                    this.setState({ name: '' })
                    console.log(error)
                })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClear = () => {
        this.setState({
            name: '',
            editMode: false
        });
    }

    handleDelete = () => {
        const shoppingListService = new ShoppingListService(store)
        const id = this.props.selectedIngredient.id
        shoppingListService.deleteIngredient(id,)
            .then(res => {
                this.props.deleteIngredientSuccess(id)
                this.setState({ name: '', editMode: false })
                toast.success("Ingredient deleted successfully")
            })
            .catch(error => {
                toast.error("Something went wrong")
                this.setState({ name: '', editMode: false })
                console.log(error)
                console.log(error)
            })
    }

    render() {
        const { name, editMode } = this.state;

        return (
            <>
            <ToastContainer/>
                <div className="row">
                    <div className="col-xs-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-sm-5 form-group">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="name" name="name"
                                            value={name}
                                            onChange={this.handleChange}
                                            placeholder='Ingredient Name'
                                            required />
                                        <label htmlFor="name">Ingredient Name</label>
                                    </div>
                                </div>

                            </div>
                            <div className="row mt-3">
                                <div className="col-xs-12 ">
                                    <button className="btn btn-success me-3" type="submit" disabled={!name} style={{ backgroundColor: '#2c3e50', borderColor: 'aliceblue' }}>
                                        {editMode ? 'Update' : 'Add'}
                                    </button>
                                    {editMode && (
                                        <button className="btn btn-danger me-3" type="button" onClick={this.handleDelete} style={{ backgroundColor: '#c0392b', borderColor: 'aliceblue' }}>
                                            Delete
                                        </button>
                                    )}
                                    <button className="btn btn-primary" type="button" onClick={this.handleClear} style={{ backgroundColor: '#2980b9', borderColor: 'aliceblue' }}>
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.shoppingList
});

const mapDispatchToProps = {
    addIngredientSuccess,
    updateIngredientSuccess,
    deleteIngredientSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListEditComponent)