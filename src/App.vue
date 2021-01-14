<template>
  <div id="app">
    <div v-if="!showDetail">
      <header>
        <h2>My recipes</h2>
        <button @click="showRecipe = true">Add Recipe</button>
      </header>
      <div v-if="showRecipe" class="recipe-name">
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
                <th>Directions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th @click="showDetail = true">Tasty Apple pie</th>
                <th>6</th>
                <th>8</th>
              </tr>
              <tr>
                <td>Amazing Savory Strudel</td>
                <th>8</th>
                <th>12</th>
              </tr>
              <tr>
                <td>Easy Scrumble Eggs</td>
                <th>3</th>
                <th>2</th>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
    <div v-if="showDetail">
      <recipe-detail></recipe-detail>
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
  data() {
    return {
      //recipeTitle: "Tasty Apple pie",
      //ingredients: 6,
      //steps: 8,
      showRecipe: false,
      showDetail: false,
      newRecipeName: "",
    };
  },
  methods: {
    cancelAdding() {
      this.newRecipeName = "";
      this.showRecipe = false;
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
</style>
