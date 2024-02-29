import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import AuthComponent from './Components/AuthComponent';
import "bootstrap-icons/font/bootstrap-icons.css";
import HeaderComponent from './Components/HeaderComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ShoppingComponent from './Components/ShoppingComponent';
import withNavigation from './Routing/withNavigation';
import withParams from './Routing/withParams';
import RecipeComponent from './Components/Recipes/RecipeComponent';
import RecipeDetailComponent from './Components/Recipes/RecipeDetailComponent';
import RecipeStartComponent from './Components/Recipes/RecipeStartComponent';

export default class App extends Component {
  render() {

    const AuthComponentWithNav = withNavigation(AuthComponent);
    const ShoppingComponentWithNav = withNavigation(ShoppingComponent);
    const RecipeComponentWithNav = withNavigation(RecipeComponent);

    const RecipeDetailComponentWithParams = withParams(RecipeDetailComponent);
    const RecipeDetailComponentWithNav = withNavigation(RecipeDetailComponent);
    return (
      <div className="RecipeBook" style={{ backgroundColor: '#1e1e1e', minHeight: '100vh', width: '100%' }}>
        <Router>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<AuthComponentWithNav />}></Route>
            <Route path="/auth" element={<AuthComponentWithNav />}></Route>
            <Route path='/shopping' element={<ShoppingComponentWithNav />}></Route>
            <Route path='/recipes' element={<RecipeComponentWithNav />}>
              <Route index element={<RecipeStartComponent />}></Route>
              {/* <Route path=':id' element={<RecipeDetailComponentWithParams />}></Route> */}
              <Route path=':id' element={<RecipeDetailComponentWithParams />}></Route>

            </Route>
          </Routes>
        </Router>
      </div>
    )
  }
}
