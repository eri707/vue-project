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
        },
        async fetchRecipe({ commit }, payload){
            console.log(payload)
            // fetch from API
            const response = await fetch(`http://localhost:10/${payload}`);
            // early return if there is a failure
            if(!response.ok) return null;
            // call mutation with response data
            commit('setRecipe', await response.json())
        },
        async deleteRecipe({ commit, dispatch }, payload){
            const response = await fetch(`http://localhost:10/${payload}`, {
                method: 'DELETE'
            });
            if(!response.ok) return null;
            // call mutation with response data
            commit('setRecipe', null);
            dispatch('fetchRecipes');
        },
        async updateRecipe({ commit, dispatch }, payload){
            const response = await fetch(`http://localhost:10/${payload.id}`, {
                method: 'put',
                body: JSON.stringify(payload),
                headers:{'content-type': 'application/json'},
            });
            if(!response.ok) return null;
            // call mutation with response data
            commit('setRecipe', await response.json());
            dispatch('fetchRecipes');
        },
        async addRecipe({ commit, dispatch }, payload){
            const response = await fetch(`http://localhost:10/`, {
                method: 'post',
                body: JSON.stringify(payload),
                headers:{'content-type': 'application/json'},
            });
            if(!response.ok) return null;
            // call mutation with response data
            commit('setRecipe', await response.json());
            dispatch('fetchRecipes');
        }
    }
})
export default store