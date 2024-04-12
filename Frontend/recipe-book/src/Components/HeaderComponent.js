import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/HeaderComponent.css';
import AuthenticationService from '../Services/AuthenticationService';
import { connect } from 'react-redux';
import { logoutSuccess } from '../Store/Auth/AuthActions';
import { store } from '../Store/Store';
class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavCollapsed: true
    };
  }

  handleLogout = () => {
    const authService = new AuthenticationService(store);
    authService.logout();
  };
  handleNavCollapse = () => {
    this.setState({ isNavCollapsed: !this.state.isNavCollapsed });
  }

  render() {
    const { isNavCollapsed } = this.state;
    const { isUserLoggedIn } = this.props;

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
                {!isUserLoggedIn && <NavLink className="nav-link" to="/auth" >Authentication</NavLink>
                }
              </li>
              <li className="nav-item">
                {isUserLoggedIn && <NavLink className="nav-link" to="/recipes" >Recipes</NavLink>
                }
              </li>
              <li className="nav-item">
                {isUserLoggedIn && <NavLink className="nav-link" to="/shopping-list" >Shopping List</NavLink>}
              </li>

              {/* Add another nav-item for My Feed NavLink */}
              <li className="nav-item">
                {isUserLoggedIn && <NavLink className="nav-link" to="/feed" >My Feed</NavLink>}
                </li>

              <li className='nav-item'>
                {isUserLoggedIn && <NavLink className="nav-link" to="/logout" onClick={this.handleLogout}>Log Out</NavLink>}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}


const mapStateToProps = (state) => ({
  isUserLoggedIn: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logoutSuccess })(HeaderComponent);
