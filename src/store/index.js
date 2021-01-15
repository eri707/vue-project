import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        recipes: [],
        recipe: null
    },
    mutations: {
        setRecipes(state, data) {
            state.recipes = data;
        },
        setRecipe(state, data) {
            state.recipe = data;
        }
    },
    actions: {
        async fetchRecipes({ commit }){
            // fetch from API
            const response = await fetch('http://localhost:10/');
            // early return if there is a failure
            if(!response.ok) return null;
            // call mutation with response data
            commit('setRecipes', await response.json())
        }
    }
})
export default store