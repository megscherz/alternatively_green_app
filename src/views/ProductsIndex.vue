<script>
import axios from "axios";

export default {
  data: function () {
    return {
      products: [],
      currentProduct: [],
      reviews: [],
      currentReview: [],
      newReviewParams: {},
    };
  },
  created: function () {
    this.indexProducts();
  },
  methods: {
    indexProducts: function () {
      axios.get("/products").then((response) => {
        console.log("products index", response);
        this.products = response.data;
      });
    },
    showProduct: function (product) {
      console.log(product);
      this.currentProduct = product;
      this.editProductParams = product;
      document.querySelector("#product-details").showModal();
    },
  },
};
</script>

<template>
  <div class="products-index">
    <h1>All Products</h1>
    <div v-for="product in products" v-bind:key="product.id">
      <h2>{{ product.name }}</h2>
      <img v-bind:src="product.image_url" v-bind:alt="product.name" />
      <br />
      <router-link v-bind:to="`/products/${product.id}`">See Alternatives</router-link>
    </div>
    <br />
  </div>
</template>

<style>
img {
  width: 300px;
  height: 400px;
}
</style>
