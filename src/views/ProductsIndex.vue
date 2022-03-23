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
      productSearch: "",
    };
  },
  created: function () {
    this.indexProducts();
  },

  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        return product.name.toLowerCase().includes(this.productSearch);
      });
    },
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
    scrollToTop: function () {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<template>
  <div class="products-index">
    <!-- Section -->
    <section class="section bg-gray-100">
      <div class="container">
        <div class="row justify-content-center section-heading">
          <div class="col-lg-8 col-xl-7 text-center">
            <h3 class="h1">Our Products</h3>
            <div class="lead">
              See a list of all of our products, Standard and Green.Click on a product to see more information about it
              as well as the Alternatives for it.
              <p></p>
              <form class="d-flex">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  v-model="productSearch"
                />
              </form>
            </div>
          </div>
        </div>
        <div class="row">
          <div v-for="product in filteredProducts" v-bind:key="product.id" class="col-sm-6 col-lg-4 my-3">
            <div class="card hover-top">
              <img class="card-img-top" v-bind:src="product.image_url" v-bind:alt="product.name" />
              <div class="card-body pt-0">
                <div class="icon icon-primary rounded-circle mt-n5 mb-2">
                  <i class="fa-brands fa-envira"></i>
                </div>
                <div class="media align-items-center">
                  <div class="media-body pe-3">
                    <h5 class="mb-2 pt-2">
                      <router-link v-bind:to="`/products/${product.id}`" class="text-dark stretched-link">
                        {{ product.name }}
                      </router-link>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
        <div class="container">
          <div class="row justify-content-center">
            <div class="text-center">
              <button class="btn btn-primary" v-on:click="scrollToTop()">Back to Top</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Section -->
  </div>
</template>
