<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="signup">
    <section class="section bg-gray-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h3 class="h1">
                <mark>New User Signup:</mark>
              </h3>
              <div class="lead">Sign up for an account here.</div>
            </div>
            <form
              class="rd-mailform"
              data-form-output="form-output-global"
              data-form-type="contact"
              method="post"
              action="static/vendor/mail/bat/rd-mailform.php"
              v-on:submit.prevent="submit()"
            >
              <div class="row">
                <ul>
                  <li v-for="error in errors" v-bind:key="error">{{ error }}></li>
                </ul>
                <div class="col-sm-6">
                  <div class="form-floating mb-4">
                    <input type="text" class="form-control" v-model="newUserParams.first_name" />
                    <label class="form-label">First Name</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-floating mb-4">
                    <input type="text" class="form-control" v-model="newUserParams.last_name" />
                    <label class="form-label">Last Name</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-floating mb-4">
                    <input type="text" class="form-control" v-model="newUserParams.user_name" />
                    <label class="form-label">Username</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-floating mb-4">
                    <input type="text" class="form-control" v-model="newUserParams.email" />
                    <label class="form-label">Email</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-floating mb-4">
                    <input type="password" class="form-control" v-model="newUserParams.password" />
                    <label class="form-label">Password</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-floating mb-4">
                    <input type="password" class="form-control" v-model="newUserParams.password_confirmation" />
                    <label class="form-label">Password Confirmation</label>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-floating mb-4">
                    <input type="text" class="form-control" v-model="newUserParams.image_url" />
                    <label class="form-label">Profile Picture</label>
                  </div>
                </div>
                <div class="col-12 pt-3">
                  <button class="btn btn-primary" type="submit" name="send">Create User</button>
                  <div class="snackbars" id="form-output-global"></div>
                </div>
              </div>
            </form>
            <div class="extra-menu d-none d-lg-block ps-4">
              <router-link to="/login">
                <span class="btn--text">Or Login Here</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
