<template>
  <div id="app">
    <div v-if="!recipe"> 
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
          <button @click="addRecipe">Save</button>
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
                <th>
                  <a @click="fetchRecipe(item.id)">{{ item.name }}</a>
                </th>
                <th>{{ item.ingredients ? item.ingredients.length : 0 }}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
    <div>
      <recipe-detail ref="detail" v-if="recipe"></recipe-detail>
    </div>
  </div>
</template>

<script>
import RecipeDetail from "./components/RecipeDetail.vue";
export default {
  name: "App",
  components: {
    RecipeDetail,
  },
  mounted() {
    this.$store.dispatch("fetchRecipes");
  },
  data() {
    return {
      showAddRecipe: false,
      newRecipeName: "",
    };
  },
  methods: {
    cancelAdding() {
      this.newRecipeName = "";
      this.showAddRecipe = false;
    },
    fetchRecipe(id) {
      this.$store.dispatch("fetchRecipe", id);
    },
    addRecipe() {
      this.$store.commit("setRecipe", {
        name: this.newRecipeName,
        ingredients: [],
        directions: "",
      });
      setTimeout(() => {
        this.$refs.detail.showEdit('add');
      }, 50);
      this.cancelAdding();
    },
  },
  computed: {
    recipes() {
      return this.$store.state.recipes;
    },
    recipe() {
      console.log(this.$store.state.recipe);
      return this.$store.state.recipe;
    },
  },
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
a {
  cursor: pointer;
}
</style>
