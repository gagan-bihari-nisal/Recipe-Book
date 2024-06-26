import axios from 'axios';
import API_CONFIG from '../Constants/ApiConfig';
class RecipeService {
    constructor(store) {
        this.store = store;
    }

    getAllRecipes() {
        const { auth } = this.store.getState();
        const { token } = auth;
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        return axios.get(`${API_CONFIG.recipeService}/getAllRecipes`, {
            headers: headers
        })
    }

    getOtherRecipes(){
        const { auth } = this.store.getState();
        const { token } = auth;
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        return axios.get(`${API_CONFIG.recipeService}/getOtherRecipes`, {
            headers: headers
        })
    }

    updateRecipe(formData, recipeId) {
        const { auth } = this.store.getState();
        const { token } = auth;
        return axios.put(`${API_CONFIG.recipeService}/${recipeId}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    addRecipe(formData) {
        const { auth } = this.store.getState();
        const { token } = auth;
        return axios.post(`${API_CONFIG.recipeService}/addRecipe`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    addIngredientsToShoppingListByRecipeId(recipeId) {
        const { auth } = this.store.getState();
        const { token } = auth;
        const headers = {
            'Authorization': `Bearer ${token}`,
        };
        return axios.post(`${API_CONFIG.recipeService}/ingredients/addToShopping/${recipeId}`, null, {
            headers: headers
        });
    }

    deleteRecipe(recipeId) {
        const { auth } = this.store.getState();
        const { token } = auth;
        const headers = {
            'Authorization': `Bearer ${token}`,
        };
        return axios.delete(`${API_CONFIG.recipeService}/${recipeId}`, {
            headers: headers
        });
    }
}

export default RecipeService;
