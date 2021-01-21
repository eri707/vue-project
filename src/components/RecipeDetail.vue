<template>
  <div class="detail-page">
    <header>
      <!-- #region recipe name -->
      <div class="title" v-if="!clonedRecipe">
        <i
          class="fas fa-chevron-left"
          @click="$store.commit('setRecipe', null)"
        ></i>
        <span>{{ recipe.name }}</span>
      </div>
      <div class="title" v-else>
        <input type="text" v-model="clonedRecipe.name" />
      </div>
      <!-- #endregion -->
      <!-- #region buttons -->
      <div class="button" v-if="!clonedRecipe">
        <button @click="showEdit('update')">Edit Recipe</button>
        <button @click="deleteRecipe">Delete Recipe</button>
      </div>
      <div class="button" v-else>
        <button @click="cancelEdit">Cancel</button>
        <button @click="saveRecipe">Save Recipe</button>
      </div>
      <!-- #endregion -->
    </header>
    <main v-if="!clonedRecipe">
      <div class="ingredients">
        <p>Ingredients</p>
        <ul v-for="item in recipe.ingredients" :key="item.id">
          <li>{{ item }}</li>
        </ul>
      </div>
      <div class="directions">
        <p>Directions</p>
        <ol>
          <p>{{ recipe.directions }}</p>
        </ol>
      </div>
    </main>
    <main v-else>
      <div class="ingredients">
        <p>Ingredients</p>
        <ul v-for="item in clonedRecipe.ingredients" :key="item">
          <li>{{ item }}</li>
          <i class="fas fa-times-circle" @click="deleteIngredient(item)"></i>
        </ul>
      </div>
      <div class="addIngredients">
        <input
          type="text"
          placeholder="Add more ingredients"
          v-model="ingredientName"
        />
        <button @click="addIngredient">Add</button>
      </div>
      <div class="directions">Directions</div>
      <textarea v-model="clonedRecipe.directions"></textarea>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clonedRecipe: null,
      ingredientName: null,
      directionName: null,
      action: 'add'
    };
  },
  methods: {
    showEdit(action) {
      this.action = action;
      this.clonedRecipe = JSON.parse(JSON.stringify(this.recipe));
    },
    cancelEdit() {
      this.clonedRecipe = null;
    },
    deleteIngredient(item) {
      const idx = this.clonedRecipe.ingredients.findIndex((r) => r == item);
      console.log(this.clonedRecipe.ingredients);
      this.clonedRecipe.ingredients.splice(idx, 1);
    },
    addIngredient() {
      this.clonedRecipe.ingredients.push(this.ingredientName);
      this.ingredientName = null;
    },
    deleteRecipe() {
      this.$store.dispatch("deleteRecipe", this.recipe.id);
    },
    saveRecipe() {
      if (this.action == "add") {
        this.$store.dispatch("addRecipe", this.clonedRecipe);
      } else {
        this.$store.dispatch("updateRecipe", this.clonedRecipe);
      }
      this.clonedRecipe = null;
    },
  },
  computed: {
    recipe() {
      return this.$store.state.recipe;
    },
  },
};
</script>

<style lang="scss">
header {
  display: flex;
}
.detail-page {
  main {
    border: 1px solid black;
    padding: 5px;
    margin-left: 15px;
    margin-right: 15px;
  }
}
textarea {
  width: 80%;
  height: 10rem;
}
</style>