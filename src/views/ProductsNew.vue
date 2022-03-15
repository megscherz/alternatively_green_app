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
    <form v-on:submit.prevent="createProduct()"></form>
    <h1>New Product</h1>
    <ul>
      <li v-for="error in errors" v-bind:key="error">{{ error }}></li>
    </ul>
    <div>
      <label>Name:</label>
      <input type="text" v-model="newProductParams.name" />
    </div>
    <div>
      <label>Description:</label>
      <input type="textarea" v-model="newProductParams.description" />
    </div>
    <div>
      <label>Category:</label>
      <br />
      <input type="checkbox" id="green_product" name="green_product" value="green" />
      <label for="green_product">Green Product</label>
      <br />
      <input type="checkbox" id="standard_product" name="standard_product" value="standard" />
      <label for="standard_product">Standard Product</label>
    </div>
    <div>
      <label>Image:</label>
      <input type="img" v-model="newProductParams.name" />
    </div>
    <div>
      <label>Price:</label>
      <input type="integer" v-model="newProductParams.price" />
    </div>
    <div>
      <label>Ingredients:</label>
      <input type="text" v-model="newProductParams.ingredients" />
    </div>
  </div>
</template>

<style></style>
