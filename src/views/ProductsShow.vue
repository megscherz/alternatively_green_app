<script>
import axios from "axios";

export default {
  data: function () {
    return {
      product: {},
      currentProduct: [],
    };
  },
  created: function () {
    axios.get(`/products/${this.$route.params.id}`).then((response) => {
      console.log("Products Show", response.data);
      this.product = response.data;
    });
  },
  methods: {
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
  <div class="products-show">
    <div v-for="green_alternatives in product.alternatives" :key="green_alternatives.id">
      <img v-bind:src="green_alternatives.image_url" alt="" />
      <h1>{{ green_alternatives.name }}</h1>
      <button v-on:click="showProduct(product)">More Info</button>
      <br />
      <div>
        <dialog id="product-details">
          <form method="dialog">
            <img v-bind:src="green_alternatives.image_url" v-bind:alt="product.name" />
            <p>Description: {{ green_alternatives.description }}</p>
            <p>Price: {{ green_alternatives.price }}</p>
            <p>Ingredients: {{ green_alternatives.ingredients }}</p>
            <button>Close</button>
          </form>
        </dialog>
      </div>
    </div>
    <div v-for="reviews in product.reviews" :key="reviews.id">
      <p>{{ reviews.title }}</p>
    </div>
    <input type="button" />
  </div>
</template>

<style></style>
