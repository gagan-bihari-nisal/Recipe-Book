import React from 'react';
export default class RecipeItemComponent extends React.Component {
  render() {
    const { index, recipe, onClick } = this.props;

    return (
      <>
      <div className="list-group-item clearfix"  style={{ marginTop: '5px', marginBottom: '5px' }} onClick={() => onClick(index)}>
        <div className="pull-left">
          <h4 className="list-group-item-heading">{recipe.name}</h4>
          <p className="list-group-item-text">{recipe.description}</p>
        </div>
        <span className="pull-right">
          <img
            src={recipe.imagePath}
            alt={recipe.name}
            className="img-responsive"
            style={{ maxHeight: '50px' }}
          />
        </span>
      </div>

     
      </>

      
    );
  }
}