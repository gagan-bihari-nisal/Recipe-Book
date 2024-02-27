import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/HeaderComponent.css';

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavCollapsed: true
    };
  }

  handleNavCollapse = () => {
    this.setState({ isNavCollapsed: !this.state.isNavCollapsed });
  }

  render() {
    const { isNavCollapsed } = this.state;

    return (
      <nav className="navbar navbar-inverse navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="navbar-brand">Recipe Book</div>
          </div>
          <button className="navbar-toggler" type="button" onClick={this.handleNavCollapse}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/auth" activeClassName="active">Authentication</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/recipes">Recipes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/shopping">Shopping List</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}


