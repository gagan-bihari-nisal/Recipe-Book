import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import AuthComponent from './Components/AuthComponent';
import "bootstrap-icons/font/bootstrap-icons.css";
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
export default class App extends Component {
  render() {
    const AuthComponentWithNav = withNavigation(AuthComponent);

    const RecipeComponentWithNav = withNavigation(RecipeComponent);
    const RecipeDetailComponentWithParams = withParams(RecipeDetailComponent);

    const ShoppingListComponenetWithNav = withNavigation(ShoppingListComponent);
    const LogoutComponentWithNav = withNavigation(LogoutComponent);
    return (
      <div className="RecipeBook" style={{ backgroundColor: '#1e1e1e', minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
        <Router>
          <HeaderComponent />
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
              <Route path=':id' element={<RecipeDetailComponentWithParams />}></Route>
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
