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
    <h1>New Product</h1>
    <form v-on:submit.prevent="createProduct()">
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
        <input type="radio" id="green" name="category" value="green" v-model="newProductParams.category" />
        <label for="green">Green Product</label>
        <br />
        <input type="radio" id="standard" name="category" value="standard" v-model="newProductParams.category" />
        <label for="standard">Standard Product</label>
      </div>
      <div>
        <label>Image:</label>
        <input type="text" v-model="newProductParams.image_url" />
      </div>
      <div>
        <label>Price:</label>
        <input type="integer" v-model="newProductParams.price" />
      </div>
      <div>
        <label>Ingredients:</label>
        <input type="text" v-model="newProductParams.ingredients" />
      </div>
      <input type="submit" value="Create Product" />
    </form>
  </div>
</template>

<style></style>
