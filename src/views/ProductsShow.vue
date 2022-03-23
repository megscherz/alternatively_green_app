<script>
import axios from "axios";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export default {
  data: function () {
    return {
      product: {},
      currentProduct: [],
      reviews: {},
      currentReview: [],
      newReviewParams: {
        product_id: this.$route.params.id,
      },
      editReviewParams: {
        product_id: this.$route.params.id,
      },
      errors: {},
      currentUserId: localStorage.user_id,
    };
  },
  created: function () {
    this.scrollToTop();
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
          // this.reviews.push("/reviews");
          this.product.reviews.push(response.data);
          this.newReviewParams = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    showReview: function (review) {
      this.currentReview = review;
      this.editReviewParams = review;
      document.querySelector("#review-details").showModal();
    },
    // updateReview: function (review) {
    //   axios
    //     .patch("/reviews/" + review.id, this.editReviewParams)
    //     .then((response) => {
    //       console.log("reviews update", response);
    //       this.currentReview = {};
    //     })
    //     .catch((error) => {
    //       console.log(error.response.data.errors);
    //     });
    // },
    destroyReview: function (review) {
      axios.delete("/reviews/" + review.id).then((response) => {
        console.log("reviews destroy", response);
        var index = this.product.reviews.indexOf(review);
        this.product.reviews.splice(index, 1);
      });
    },
    relativeDate: function (date) {
      return dayjs().to(dayjs(date));
    },
    scrollToTop: function () {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<template>
  <div class="products-show">
    <section>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 my-3 pe-xl-12">
            <h3 class="text-primary mb-3">Product</h3>
            <h3 class="h1">
              <mark>{{ product.name }}</mark>
            </h3>
            <div class="media mb-5">
              <div class="only-icon only-icon-lg text-primary">
                <i class="icon-layers"></i>
              </div>
              <div class="col ps-3">
                <h5>Description</h5>
                <p class="m-0">{{ product.description }}</p>
              </div>
            </div>
            <div class="media mb-5">
              <div class="only-icon only-icon-lg text-primary">
                <i class="icon-layers"></i>
              </div>
              <div class="col ps-3">
                <h5>Ingredients</h5>
                <p class="m-0">{{ product.ingredients }}</p>
              </div>
            </div>
            <div class="media mb-5">
              <div class="only-icon only-icon-lg text-primary">
                <i class="icon-layers"></i>
              </div>
              <div class="col ps-3">
                <h5>Price</h5>
                <p class="m-0">${{ product.price }}</p>
              </div>
            </div>
          </div>
          <div class="col-lg-6 my-3">
            <img v-bind:src="product.image_url" alt="" />
          </div>
        </div>
      </div>
    </section>
    <div>
      <div class="container">
        <div>
          <h3 class="text-primary">Reviews</h3>
        </div>
        <br />
        <br />
        <br />
        <div class="row justify-content-center">
          <div v-for="review in product.reviews" v-bind:key="review.id" class="col-8 my-3 col-lg-4">
            <div class="mt-n8 hover-top--in">
              <div class="shadow-sm rounded-3 bg-white p-4">
                <div class="text-muted mb-3">
                  <i class="far fa-clock me-2"></i>
                  Created at: {{ relativeDate(date) }}
                </div>
                <div>
                  <p class="h5">{{ review.user.user_name }} says...</p>
                  <p class="h5">{{ review.title }}</p>
                  <p class="pt-3">{{ review.body }}</p>
                  <p class="pt-3">Star Rating: {{ review.star_rating }}/5</p>
                  <button class="btn btn-primary" v-on:click="destroyReview(review)">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="review-details">
        <section class="section bg-gray-100">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="section-heading">
                  <h3 class="h1">
                    <mark>Add Your Own Review</mark>
                  </h3>
                  <div class="lead">
                    Alternatively Green appreciates your experiences and reviews on products. We appreciate them so much
                    that we're allowing you to add products to our page!
                  </div>
                </div>
                <form
                  class="rd-mailform"
                  data-form-output="form-output-global"
                  data-form-type="contact"
                  method="post"
                  action="static/vendor/mail/bat/rd-mailform.php"
                  v-on:submit.prevent="createReview()"
                >
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-floating mb-4">
                        <input type="text" class="form-control" v-model="newReviewParams.title" />
                        <label class="form-label">Title</label>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-floating mb-4">
                        <input type="integer" class="form-control" v-model="newReviewParams.star_rating" />
                        <label class="form-label">Star Rating (out of 5)</label>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-floating mb-4">
                        <input type="text" class="form-control" v-model="newReviewParams.image_url" />
                        <label class="form-label">Product Image URL (optional)</label>
                      </div>
                    </div>

                    <br />
                    <br />
                    <div class="col-12">
                      <div class="form-floating mb-4">
                        <textarea
                          class="form-control"
                          id="contact-message"
                          name="message"
                          rows="3"
                          style="height: 150px"
                          v-model="newReviewParams.body"
                        ></textarea>
                        <label class="form-label" for="contact-message">Review</label>
                      </div>
                    </div>
                    <div class="col-12 pt-3">
                      <button class="btn btn-primary" type="submit" name="send">Create A Review</button>
                      <div class="snackbars" id="form-output-global"></div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <br />
    <div class="container">
      <div class="row">
        <h3 class="text-primary mb-3">Alternatives for {{ product.name }}</h3>
        <div v-for="alternative in product.alternatives" :key="alternative.id" class="col-sm-6 col-lg-4 my-3">
          <div class="card hover-top">
            <img class="card-img-top" v-bind:src="alternative.image_url" v-bind:alt="alternative.name" />
            <div class="card-body pt-0">
              <div class="icon icon-primary rounded-circle mt-n5 mb-2">
                <i class="fa-brands fa-envira"></i>
              </div>
              <div class="media align-items-center">
                <div class="media-body pe-3">
                  <h5 class="mb-2 pt-2">
                    <router-link v-bind:to="`/products/${alternative.id}`" class="text-dark stretched-link">
                      {{ alternative.name }}
                      See Alternative
                    </router-link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div>
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <button type="button" class="btn btn-outline-primary">
              <router-link v-bind:to="`/products`">Back to All Products</router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
