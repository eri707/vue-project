<template>
  <div id="app">
    <div v-if="!showDetail">
      <header>
        <h2>My recipes</h2>
        <button @click="showAddRecipe = true">Add Recipe</button>
      </header>
      <div v-if="showAddRecipe" class="recipe-name">
        <div class="name">
          <label for="recipeName">Name</label>
          <input
            v-model="newRecipeName"
            id="recipeName"
            type="text"
            placeholder="Recipe name"
          />
        </div>
        <div class="button">
          <button @click="cancelAdding">Cancel</button>
          <button>Save</button>
        </div>
      </div>
      <main>
        <div id="table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Ingredients</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in recipes" :key="item.id">
                <th @click="showDetail = true">{{ item.name }}</th>
                <th>{{ item.ingredients ? item.ingredients.length : 0 }}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
    <div v-if="showDetail">
      <recipe-detail @show-detail="showDetail=false" @show-editing="showEdit=true"></recipe-detail>
    </div>
    <div>
      <recipe-edit></recipe-edit>
    </div>
  </div>
</template>

<script>
import RecipeDetail from "./components/RecipeDetail.vue";
import RecipeEdit from "./components/RecipeEdit.vue";
export default {
  name: "App",
  components: {
    RecipeDetail,
    RecipeEdit
  },
  mounted(){
    this.$store.dispatch('fetchRecipes');
  },
  data() {
    return {
      //recipeTitle: "Tasty Apple pie",
      //ingredients: 6,
      //steps: 8,
      showAddRecipe: false,
      showDetail: false,
      showEdit: false,
      newRecipeName: "",
    };
  },
  methods: {
    cancelAdding() {
      this.newRecipeName = "";
      this.showAddRecipe = false;
    },
  },
  computed:{
    recipes(){
      return this.$store.state.recipes;
    }
  }
};
</script>

<style lang="scss">
:root {
  --border-radius: 2px;
}
#app {
  width: 70%;
}
button {
  padding: 2px 5px;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.recipe-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .name {
    margin-left: 18px;
  }
}
</style>
