<script>
// import axios from "axios";

import axios from "axios";

export default {
  data: function () {
    return {
      product: {},
    };
  },
  created: function () {
    axios.get(`products/${this.$route.params.id}`).then((response) => {
      console.log("Products Show", response.data);
      this.recipe = response.data;
    });
  },
  methods: {},
};
</script>

<template>
  <div class="products-show">
    <h1>{{ product.name }}</h1>
    <img src="product.image_url" alt="" />
    <div v-for="alternatives in product.alternatives" :key="alternatives.id">
      <p>{{ products.alternatives.name }}</p>
      <p>{{ products.alternatives.description }}</p>
    </div>
    <div v-for="reviews in product.reviews" :key="reviews.id"></div>
  </div>
</template>

<style></style>
