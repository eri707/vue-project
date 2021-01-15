<template>
  <div class="detail-page">
    <header>
      <div class="title">
        <i @click="$emit('show-detail')" class="fas fa-chevron-left"></i>
        <span>Tasty Apple Pie</span>
      </div>
      <div class="button">
        <button @click="$emit('show-editing')">Edit Recipe</button>
        <button>Delete Recipe</button>
      </div>
    </header>
    <main>
      <div class="ingredients">Ingredients</div>
      <ol>
        <li>Baking Soda</li>
        <li>Crust Booster</li>
        <li>More Sugar</li>
      </ol>
      <div class="directions">Directions</div>
      <ol>
        <li>Dump stuff into a bowl</li>
        <li>Stir it well</li>
        <li>Toss it into the oven</li>
        <li>Wait an eternity</li>
      </ol>
    </main>
  </div>
</template>

<script>
export default {
  data(){
    return {
      showList: false,
    }

  }
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
</style>