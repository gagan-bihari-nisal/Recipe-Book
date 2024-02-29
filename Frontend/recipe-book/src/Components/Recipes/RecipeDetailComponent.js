import React, { Component } from 'react'
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default class RecipeDetailComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { location } = this.props;
    const { recipe } = location.state;
    return (
      <>
       <div className="row" style={{marginTop:'10px'}}>
          <div className="col-xs-12">
            <img src={recipe.imagePath} className="img-responsive" alt={recipe.name} style={{maxHeight:'300px'}} />

          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <h1>{recipe.name}</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <div className="btn-group " appDropdown>
              <button className="btn btn-primary dropdown-toggle">
                Manage <span className="caret"></span>
              </button>

              <ul className="dropdown-menu">
                <li>
                  <a href="src" style={{cursor:'pointer'}}>To Shopping List</a>
                </li>
                <li>
                  <a href="src"  style={{cursor:'pointer'}}>Edit Recipe</a>
                </li>
                <li>
                  <a href="src"  style={{cursor:'pointer'}}>Delete Recipe</a>
                </li>
              </ul>
            </div>
          </div>
        </div>


      </>
    )
  }
}
