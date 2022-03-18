<script>
import axios from "axios";

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
      this.editReviewParams = review;
      document.querySelector("#review-details").showModal();
    },
    updateReview: function (review) {
      axios
        .patch("/reviews/" + review.id, this.editReviewParams)
        .then((response) => {
          console.log("reviews update", response);
          this.currentReview = {};
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    destroyReview: function (review) {
      axios.delete("/reviews" + review.id).then((response) => {
        console.log("reviews destroy", response);
        var index = this.review.indexOf(review);
        this.reviews.splice(index, 1);
      });
    },
  },
};
</script>

<template>
  <div class="products-show">
    <section class="section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 my-3 pe-xl-12">
            <h6 class="text-primary mb-3">Product</h6>
            <h3 class="h1">
              <mark>{{ product.name }}</mark>
            </h3>
            <!-- <div class="lead mb-6">
              Vencer is a HTML5 template based on Sass and Bootstrap 5 with modern and creative multipurpose design you
              can use it as a startups.
            </div> -->
            <div class="media mb-5">
              <div class="only-icon only-icon-lg text-primary">
                <i class="icon-tools"></i>
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
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="row">
              <div class="col-sm-6 col-md-4 col-lg-6 my-3">
                <div class="col-lg-6 my-3 pe-xl-12">
                  <h6 class="text-primary mb-3">Reviews</h6>
                </div>
                <div v-for="review in product.reviews" v-bind:key="review.id" class="hover-top-in">
                  <div>
                    <a href="#">
                      <img class="rounded-3 shadow-sm" src="static/img/1000x700.jpg" title="" alt="" />
                    </a>
                  </div>
                  <div class="mt-n8 hover-top--in">
                    <div class="mx-3 mx-lg-4 shadow-sm rounded-3 bg-white p-4 position-relative">
                      <div class="text-muted mb-3">
                        <i class="far fa-clock me-2"></i>
                        add date here
                      </div>
                      <a class="h5" href="#">{{ review.user.user_name }} says...</a>
                      <a class="h5" href="#">{{ review.title }}</a>
                      <p class="pt-3">{{ review.body }}</p>
                      <p class="pt-3">Star Rating: {{ review.star_rating }}/5</p>
                      <a class="ms-auto font-w-600 link-effect" href="#">Read More</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-for="review in product.reviews" v-bind:key="review.id"></div>
      <button v-on:click="showReview()">Add Your Review Here</button>
      <button v-on:click="updateReview(currentReview)">Update Review</button>
      <div>
        <dialog id="review-details">
          <form method="dialog">
            <h1>New Review</h1>
            <p>
              Title:
              <input type="text" v-model="newReviewParams.title" />
            </p>
            <p>
              Image:
              <input type="text" v-model="newReviewParams.image_url" />
            </p>
            <p>
              Review:
              <textarea rows="5" cols="60" v-model="newReviewParams.body"></textarea>
            </p>
            <p>
              Star Rating:
              <input type="text" v-model="newReviewParams.star_rating" />
            </p>
            <button v-on:click="createReview()">Create</button>
            <button v-on:click="destroyReview(currentReview)">Delete</button>
            <button>Close</button>
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
