import API_CONFIG from "../Constants/ApiConfig";
import axios from "axios";
class ShoppingListService {
    constructor(store) {
        this.store = store;
    }
    getAllIngredients(){
        const {auth} = this.store.getState();
        const {token} = auth;
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        return axios.get(`${API_CONFIG.shoppingListService}`,{
            headers:headers
        })
    }
}

export default ShoppingListService