<template>
  <div class="edit-recipe">
    <header>
      <input type="text" />
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
        </ol>
      </div>
      <div class="directions">
        <p>Directions</p>
        <ol>
          <li></li>
        </ol>
      </div>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.edit-recipe {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>