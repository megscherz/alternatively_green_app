<script>
import axios from "axios";

export default {
  data: function () {
    return {
      product: {},
      currentProduct: [],
      newReviewParams: {},
      errors: {},
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
    createReview: function () {
      axios
        .post("/reviews", this.newReviewParams)
        .then((response) => {
          console.log("reviews create", response.data);
          this.$router.push("/reviews");
          this.newReviewParams = {};
        })
        .catch((error) => {
          console.log("reviews create error", error.response);
        });
    },
    showReview: function (review) {
      this.currentReview = review;
      document.querySelector("#review-details").showModal();
    },
  },
};
</script>

<template>
  <div class="products-show">
    <div>
      <h1>Alternatives for {{ product.name }}</h1>
      <img v-bind:src="product.image_url" alt="" />
      <p>Description: {{ product.description }}</p>
      <p>Price: ${{ product.price }}</p>
      <p>Ingredients: {{ product.ingredients }}</p>
    </div>
    <div>
      <h3>Reviews of {{ product.name }}</h3>
      <div v-for="review in product.reviews" v-bind:key="review.id">
        <p>{{ review.title }}</p>
        <p>{{ review.image_url }}</p>
        <p>{{ review.body }}</p>
        <p>{{ review.star_rating }}</p>
        <button v-on:click="createReview(review)">Add Your Review</button>
      </div>
      <div>
        <dialog id="reviews-new">
          <form method="dialog">
            <h1>New Review</h1>
            <div>
              Title:
              <input type="text" v-model="newReviewParams.title" />
              Image:
              <input type="text" v-model="newReviewParams.image_url" />
              Review:
              <input type="text" v-model="newReviewParams.body" />
              Star Rating:
              <input type="text" v-model="newReviewParams.star_rating" />
              <button v-on:click="createReview()">Create Review</button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
    <div v-for="alternative in product.alternatives" :key="alternative.id">
      <img v-bind:src="alternative.image_url" alt="" />
      <h1>{{ alternative.name }}</h1>
      <router-link v-bind:to="`/products/${alternative.id}`">See Alternative</router-link>
      <br />
      <div>
        <dialog id="product-details">
          <form method="dialog">
            <img v-bind:src="alternative.image_url" v-bind:alt="product.name" />
            <p>Description: {{ alternative.description }}</p>
            <p>Price: {{ alternative.price }}</p>
            <p>Ingredients: {{ alternative.ingredients }}</p>
            <button>Close</button>
          </form>
        </dialog>
      </div>
    </div>
  </div>
</template>

<style></style>
