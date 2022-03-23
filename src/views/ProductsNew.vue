<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newProductParams: {},
      errors: {},
    };
  },
  created: function () {},
  methods: {
    createProduct: function () {
      axios
        .post("/products", this.newProductParams)
        .then((response) => {
          console.log("New Product", response.data);
          this.$router.push("/products");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="products-new">
    <section class="section bg-gray-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h3 class="h1">
                <mark>New Product:</mark>
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
              v-on:submit.prevent="createProduct()"
            >
              <div class="row">
                <ul>
                  <li v-for="error in errors" v-bind:key="error">{{ error }}></li>
                </ul>
                <div class="col-sm-6">
                  <div class="form-floating mb-4">
                    <input type="text" class="form-control" v-model="newProductParams.name" />
                    <label class="form-label">Product Name</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-floating mb-4">
                    <input type="text" class="form-control" v-model="newProductParams.image_url" />
                    <label class="form-label">Product Image URL</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-floating mb-4">
                    <input type="integer" class="form-control" v-model="newProductParams.price" />
                    <label class="form-label">Price</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-floating mb-4">
                    <input type="text" class="form-control" v-model="newProductParams.ingredients" />
                    <label class="form-label">Product Ingredients List</label>
                  </div>
                </div>
                <div>
                  <label>Category:</label>
                  <br />
                  <input type="radio" id="green" name="category" value="green" v-model="newProductParams.category" />
                  <label for="green">Green Product</label>
                  <br />
                  <input
                    type="radio"
                    id="standard"
                    name="category"
                    value="standard"
                    v-model="newProductParams.category"
                  />
                  <label for="standard">Standard Product</label>
                </div>
                <br />
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
                      v-model="newProductParams.description"
                    ></textarea>
                    <label class="form-label" for="contact-message">Description</label>
                  </div>
                </div>
                <div class="col-12 pt-3">
                  <button class="btn btn-primary" type="submit" name="send">Create Product</button>
                  <div class="snackbars" id="form-output-global"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>
