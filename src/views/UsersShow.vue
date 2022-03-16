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
    <h1>User Account:</h1>
    <img v-bind:src="user.image_url" alt="" />
    <h2>Name: {{ user.first_name + " " + user.last_name }}</h2>
    <h2>Username: {{ user.user_name }}</h2>
    <h2>Email: {{ user.email }}</h2>
    <button v-on:click="showUser()">Update User</button>
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
        <br />
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style></style>
