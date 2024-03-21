import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import AuthComponent from './Components/AuthComponent';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-toastify/dist/ReactToastify.css';
import HeaderComponent from './Components/HeaderComponent';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import withNavigation from './Routing/withNavigation';
import withParams from './Routing/withParams';
import RecipeComponent from './Components/Recipes/RecipeComponent';
import RecipeDetailComponent from './Components/Recipes/RecipeDetailComponent';
import RecipeStartComponent from './Components/Recipes/RecipeStartComponent';
import ShoppingListComponent from './Components/shopping-list/ShoppingListComponent';
import ShoppingListEditComponent from './Components/shopping-list/ShoppingListEditComponent';
import AuthenticatedRoute from './Routing/AuthenticatedRoute';
import LogoutComponent from './Components/LogoutComponent';
import RecipeEditComponent from './Components/Recipes/RecipeEditComponent';
import RecipeAddComponent from './Components/Recipes/RecipeAddComponent';
import './App.css';
import { ToastContainer } from 'react-toastify';
export default class App extends Component {
  render() {
    const AuthComponentWithNav = withNavigation(AuthComponent);

    const RecipeComponentWithNav = withNavigation(RecipeComponent);
    const RecipeDetailComponentWithParams = withParams(RecipeDetailComponent);
    const RecipeEditComponentWithParams = withParams(RecipeEditComponent);
    const ReciipeAddComponentWithNav = withNavigation(RecipeAddComponent);

    const ShoppingListComponenetWithNav = withNavigation(ShoppingListComponent);
    const LogoutComponentWithNav = withNavigation(LogoutComponent);
    return (
      <div className="RecipeBook" style={{ minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
        <Router>
          <HeaderComponent />
          <ToastContainer/>
          <Routes>
            <Route path="/" element={<Navigate to="/auth" />}></Route>
            <Route path="/auth" element={<AuthComponentWithNav />}></Route>
            <Route path="/logout" element={<AuthenticatedRoute>
              <LogoutComponentWithNav />
            </AuthenticatedRoute>} />

            {/* for recipes */}
            <Route path='/recipes/*' element={<AuthenticatedRoute>
              <RecipeComponentWithNav />
            </AuthenticatedRoute>}>
              <Route index element={<RecipeStartComponent />}></Route>
              <Route path=':id' element={<RecipeDetailComponentWithParams />} />
              <Route path=':id/edit' element={<RecipeEditComponentWithParams />} />
              <Route path='new' element={<ReciipeAddComponentWithNav />} />

            </Route>

            {/* for shopping list */}
            <Route path='/shopping-list' element={<AuthenticatedRoute>
              <ShoppingListComponenetWithNav />
            </AuthenticatedRoute>}>
              <Route path=':id/edit' element={<ShoppingListEditComponent />} />
            </Route>
          </Routes>
        </Router>

      </div>
    )
  }
}