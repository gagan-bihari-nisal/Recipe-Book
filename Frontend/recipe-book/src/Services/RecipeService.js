import axios from 'axios';
import API_CONFIG from '../Constants/ApiConfig';
class RecipeService {
    constructor(store) {
        this.store = store;
    }
    getAllRecipes() {
        const { auth } = this.store.getState();
        const {token} = auth;
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        return axios.get(`${API_CONFIG.recipeService}/getAllRecipes`,{
            headers:headers
        })
    }
}

export default RecipeService;
