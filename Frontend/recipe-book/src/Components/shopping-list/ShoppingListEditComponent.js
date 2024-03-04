import React, { Component } from 'react'

export default class ShoppingListEditComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            editMode: false
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        // You can access form data using this.state.name
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
        // Handle delete logic here
    }

    render() {
        const { name, editMode } = this.state;

        return (
            <>
                <div className="row">
                    <div className="col-xs-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-sm-5 form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" className="form-control" name="name" value={name} onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-xs-12 ">
                                    <button className="btn btn-success me-3" type="submit" disabled={!name} style={{ backgroundColor: '#2c3e50', borderColor: 'aliceblue' }}>
                                        {editMode ? 'Update' : 'Add'}
                                    </button>
                                    {editMode && (
                                        <button className="btn btn-danger" type="button" onClick={this.handleDelete} style={{ backgroundColor: '#c0392b', borderColor: 'aliceblue' }}>
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

