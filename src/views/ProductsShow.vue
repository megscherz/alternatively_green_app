<script>
import axios from "axios";

export default {
  data: function () {
    return {
      product: {},
      currentProduct: [],
      review: {},
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
          console.log("review new", response);
          this.review.push("/reviews");
          this.newReviewParams = {};
        })
        .catch((error) => {
          console.log(error.response.data.errors);
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
        <p>{{ review.star_rating }}/5</p>
        <button v-on:click="createReview()">Add Your Review</button>
      </div>
      <div class="review-new">
        <dialog>
          <form v-on:submit.prevent="createReview()">
            <h1>New Review</h1>
            <ul>
              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
            <div v-for="review in product.reviews" v-bind:key="review.id">
              Title:
              <input type="text" v-model="newReviewParams.title" />
              Image:
              <input type="text" v-model="newReviewParams.image_url" />
              Review:
              <input type="text" v-model="newReviewParams.body" />
              Star Rating:
              <input type="text" v-model="newReviewParams.star_rating" />
              <input type="submit" value="Submit" />
              <button>Close</button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
    <div v-for="alternative in product.alternatives" :key="alternative.id">
      <img v-bind:src="alternative.image_url" alt="" />
      <h1>{{ alternative.name }}</h1>
      <router-link v-bind:to="`/products/${alternative.id}`">See Alternatives</router-link>
      <br />
    </div>
  </div>
  <router-link v-bind:to="`/products`">Back to All Products</router-link>
</template>

<style></style>
