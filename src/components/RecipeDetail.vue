<template>
  <div class="detail-page">
    <header>
      <!-- #region recipe name -->
      <div class="title" v-if="!clonedRecipe">
        <a
          ><i
            class="fas fa-chevron-left"
            @click="$store.commit('setRecipe', null)"
          ></i
        ></a>
        <h2>
          <i>{{ recipe.name }}</i>
        </h2>
      </div>
      <div class="title" v-else>
        <input type="text" size="35" v-model="clonedRecipe.name" />
      </div>
      <!-- #endregion -->
      <!-- #region buttons -->
      <div class="buttons" v-if="!clonedRecipe">
        <a @click="showEdit('update')"><strong>Edit Recipe</strong></a>
        <a @click="deleteRecipe"><strong>Delete Recipe</strong></a>
      </div>
      <div class="buttons" v-else>
        <a @click="cancelEdit"><strong>Cancel</strong></a>
        <a @click="saveRecipe"><strong>Save Recipe</strong></a>
      </div>
      <!-- #endregion -->
    </header>
    <main v-if="!clonedRecipe">
      <div class="ingredients">
        <h5>Ingredients</h5>
        <ul v-for="item in recipe.ingredients" :key="item.id">
          <li>{{ item }}</li>
        </ul>
      </div>
      <div class="directions">
        <h5>Directions</h5>
        <ol>
          <p>{{ recipe.directions }}</p>
        </ol>
      </div>
    </main>
    <main v-else>
      <div class="ingredients">
        <h5>Ingredients</h5>
        <ul>
          <li v-for="item in clonedRecipe.ingredients" :key="item">
            {{ item }}
            <i class="fas fa-times-circle" @click="deleteIngredient(item)"></i>
          </li>
        </ul>
      </div>
      <div class="addIngredients">
        <input
          type="text"
          placeholder="Add more ingredients"
          v-model="ingredientName"
        />
        <button @click="addIngredient">Add Ingredient</button>
      </div>
      <div class="directions">
        <h5>Directions</h5>
      </div>
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
      action: "add",
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
.detail-page {
  header {
    .title {
      input {
        font-style: italic;
        font-size: 1.4rem;
      }
    }
  }
  main {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 1rem;

    h5 {
      margin: 0;
      margin-bottom: 0.25rem;
      text-transform: uppercase;
    }

    ul li {
      i {
        padding-left: 0.2rem;
      }
      .fa-times-circle {
        color: orangered;
        cursor: pointer;
        &:hover {
          color: salmon;
        }
      }
    }
    .addIngredients {
      padding-bottom: 1rem;
      button {
        margin-left: 1rem;
      }
    }
  }
  textarea {
    width: 100%;
    height: 10rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
}
</style>