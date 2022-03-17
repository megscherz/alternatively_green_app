<script>
import axios from "axios";

export default {
  data: function () {
    return {
      product: {},
      currentProduct: [],
      review: {},
      newReviewParams: {
        product_id: this.$route.params.id,
      },
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
          console.log("review create", response);
          this.reviews.push("/reviews");
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
    updateReview: function (review) {
      axios
        .patch("/reviews" + review.id, this.newReviewParams)
        .then((response) => {
          console.log("reviews update", response);
          this.currentReview = {};
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    destroyReview: function (review) {
      axios
        .delete("/reviews" + review.id)
        .then((response) => {
          console.log("reviews destroy", response);
          var index = this.review.indexOf(review);
          this.reviews.splice(index, 1);
      }
    },
  }
};
</script>

<template>
  <div class="products-show">
    <div>
      <h1>{{ product.name }}</h1>
      <img v-bind:src="product.image_url" alt="" />
      <p>Description: {{ product.description }}</p>
      <p>Price: ${{ product.price }}</p>
      <p>Ingredients: {{ product.ingredients }}</p>
    </div>
    <div>
      <h3>Reviews:</h3>

      <div v-for="review in product.reviews" v-bind:key="review.id">
        <p>User:{{ review.user.user_name }} says...</p>
        <p>Title:{{ review.title }}</p>
        <p>{{ review.image_url }}</p>
        <p>{{ review.body }}</p>
        <p>{{ review.star_rating }}/5</p>
      </div>
      <button v-on:click="showReview()">Add Your Review Here</button>
      <div>
        <dialog id="review-details">
          <form method="dialog">
            <h1>New Review</h1>
            <ul>
              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
            <div>
              Title:
              <input type="text" v-model="newReviewParams.title" />
              <br />
              Image:
              <input type="text" v-model="newReviewParams.image_url" />
              <br />
              Review:
              <textarea rows="5" cols="60" v-model="newReviewParams.body"></textarea>
              <br />
              Star Rating:
              <input type="text" v-model="newReviewParams.star_rating" />
              <br />
              <button v-on:click="createReview(review)">Create</button>
              <button>Close</button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
    <h3>Alternatives for {{ product.name }}</h3>
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
