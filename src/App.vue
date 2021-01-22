<template>
  <div id="app">
    <div v-if="!recipe">
      <header>
        <div class="title">
          <h2><i>My recipes</i></h2>
        </div>
        <nav class="buttons">
          <a @click="showAddRecipe = true"><strong>Add Recipe</strong></a>
        </nav>
      </header>
      <section v-if="showAddRecipe" class="add-recipe-section">
        <div class="name">
          <label for="recipeName">Name</label>
          <input
            v-model="newRecipeName"
            id="recipeName"
            type="text"
            placeholder="Recipe name"
          />
        </div>
        <div class="buttons">
          <a @click="cancelAdding"><strong>Cancel</strong></a>
          <a @click="addRecipe"><strong>Save</strong></a>
        </div>
      </section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th class="number">Ingredients</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in recipes" :key="item.id">
            <td>
              <i
                ><a @click="fetchRecipe(item.id)">{{ item.name }}</a></i
              >
            </td>
            <td class="number">
              {{ item.ingredients ? item.ingredients.length : 0 }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <recipe-detail ref="detail" v-else></recipe-detail>
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
        this.$refs.detail.showEdit("add");
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
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
#app {
  max-width: 960px;
  margin: 0 auto;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;

    .title {
      display: flex;
      align-items: center;

      h2 {
        color: green;
        margin: 0;
      }

      a {
        margin-right: 0.5rem;
      }
    }
  }
  table {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 1rem;
    width: 100%;
    tr td,
    th {
      text-align: left;
    }
    tr th.number,
    td.number {
      text-align: center;
    }
  }
}
a {
  cursor: pointer;
  text-decoration: none;
  color: orangered;

  // same as a:hover
  &:hover {
    color: salmon;
  }
}

.buttons {
  a:first-child {
    margin-right: 0.75rem;
  }
}
input[type="text"], textarea {
  padding: 0.25rem 0.5rem;
}
button {
  padding: 0.25rem 0.5rem;
  border: 0;
  color: white;
  background-color: orangered;
  border-radius: 3px;

  &:hover {
    background-color: salmon;
    cursor: pointer;
  }
}
</style>
<style lang="scss" scoped>
section.add-recipe-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 1rem;
  margin-bottom: 0.5rem;

  .name {
    label {
      margin-right: 0.5rem;
    }
  }
}
</style>