<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: [],
      currentUser: {},
      editUserParams: {},
    };
  },
  created: function () {
    axios.get(`/users/me`).then((response) => {
      console.log("Users Show", response.data);
      this.user = response.data;
    });
  },
  methods: {
    showUser: function () {
      document.querySelector("#user-details").showModal();
    },
    updateUser: function () {
      axios
        .patch(`/users/me`, this.user)
        .then((response) => {
          console.log("Updated User", response.data);
          this.$router.push(`/users/me`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function () {
      if (confirm("Are you sure you want to delete this???")) {
        axios.delete(`/user/me`).then((response) => {
          console.log("Success", response.data);
          this.$router.push("/users");
        });
      }
    },
  },
};
</script>

<template>
  <div class="users-show">
    <main>
      <section class="section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-10 col-xl-8">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-5 col-xl-6">
                      <div>
                        <div>
                          <img class="rounded" v-bind:src="user.image_url" />
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-7 col-xl-6">
                      <div class="bg-dark d-inline-block py-3 px-5 rounded mt-3 mb-5">
                        <h3 class="text-primary">{{ user.first_name + " " + user.last_name }}'s Account</h3>
                      </div>
                      <div class="py-1">
                        <label class="h6 m-0 pe-3">Name:</label>
                        <span>{{ user.first_name + " " + user.last_name }}</span>
                      </div>
                      <div class="py-1">
                        <label class="h6 m-0 pe-3">Username:</label>
                        <span>{{ user.user_name }}</span>
                      </div>
                      <div class="py-1">
                        <label class="h6 m-0 pe-3">Email:</label>
                        <span>{{ user.email }}</span>
                      </div>
                      <br />
                      <a class="btn btn-primary" v-on:click="showUser()">
                        <span class="btn--text">Update</span>
                        <span class="fas fa-edit"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- End Section -->
    </main>
    <!-- End Main -->
  </div>
  <div>
    <dialog id="user-details">
      <form method="dialog">
        <h2>Edit User</h2>
        <p>
          First Name:
          <input type="text" v-model="user.first_name" />
        </p>
        <p>
          Last Name:
          <input type="text" v-model="user.last_name" />
        </p>
        <p>
          Username:
          <input type="text" v-model="user.user_name" />
        </p>
        <p>
          Email:
          <input type="email" v-model="user.email" />
        </p>
        <p>
          Profile Picture:
          <input type="text" v-model="user.image_url" />
        </p>
        <button v-on:click="updateUser()">Update</button>
        <button v-on:click="destroyUser()">Delete</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>
