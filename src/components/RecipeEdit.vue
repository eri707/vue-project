<template>
  <div class="edit-recipe">
    <header>
      <input type="text" v-model="editRecipe" />
      <div class="button">
        <button>Cancel Editing</button>
        <button>Save Recipe</button>
      </div>
    </header>
    <main>
      <div class="ingredients">
        <p>Ingredients</p>
        <ol>
          <li></li>
          <i class="fas fa-times-circle"></i>
        </ol>
        <div class="addIngredients">
          <input type="text" placeholder="Add more ingredients" />
          <button>Add</button>
        </div>
      </div>
      <div class="directions">
        <p>Directions</p>
        <ol>
          <li></li>
          <i class="fas fa-times-circle"></i>
        </ol>
        <div class="addDirections">
          <input type="text" placeholder="Add more directions" />
          <button>Add</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  methods:{
    editRecipe(){
      return recipe.name;
    }
  },
  computed: {
    recipe() {
      return this.$store.state.recipe;
    },
  },
};
</script>

<style lang="scss">
.edit-recipe {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  main.ingredients {
    ol {
      display: flex;
    }
  }
}
</style>