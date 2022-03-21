<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>

<input type="submit" value="Submit" />

<template>
  <div class="login">
    <section class="section bg-gray-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-xl-7 pe-xl-9">
            <div class="section-heading">
              <h3 class="h1">
                <mark>Login:</mark>
              </h3>
              <div class="lead">Write somethng here.</div>
            </div>
            <form v-on:submit.prevent="submit()">
              <div class="row">
                <ul>
                  <li v-for="error in errors" v-bind:key="error">{{ error }}></li>
                </ul>
                <div class="col-sm-6">
                  <div class="form-floating mb-4">
                    <input type="email" class="form-control" v-model="newSessionParams.email" />
                    <label class="form-label">Email</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-floating mb-4">
                    <input type="password" class="form-control" v-model="newSessionParams.password" />
                    <label class="form-label">Password</label>
                  </div>
                </div>
                <div class="col-12 pt-3">
                  <button class="btn btn-primary" type="submit" name="send">Login</button>
                  <div class="snackbars" id="form-output-global"></div>
                </div>
              </div>
            </form>
            <div class="extra-menu d-none d-lg-block ps-4">
              <router-link to="/signup">
                <span class="btn--text">Or Signup Here</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
