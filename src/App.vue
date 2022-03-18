<template>
  <!-- Header -->
  <div class="header-height-bar"></div>
  <header class="fixed-top">
    <div class="header-main header-light header-height">
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="container">
          <!-- Logo -->
          <a class="navbar-brand">
            <router-link to="/" class="nav-link">Alternatively Green</router-link>
          </a>
          <!-- Logo -->
          <!-- Mobile Toggle -->
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <!-- End Mobile Toggle -->
          <!-- Menu -->
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <router-link to="/products" class="nav-link">All Products</router-link>
              </li>
              <li v-if="isLoggedIn" class="nav-item">
                <router-link to="/products/new" class="nav-link">Create a New Product</router-link>
              </li>
              <li v-if="isLoggedIn" class="nav-item">
                <router-link to="/logout" class="nav-link">Logout</router-link>
              </li>
            </ul>
            <div v-if="!isLoggedIn" class="extra-menu d-none d-lg-block ps-4">
              <router-link class="btn btn-primary btn-sm rounded-pill" to="/signup">
                <i class="fas fa-solid fa-leaf-heart"></i>
                <span class="btn--text">Sign up</span>
              </router-link>
            </div>
            <div v-if="!isLoggedIn" class="extra-menu d-none d-lg-block ps-4">
              <router-link class="btn btn-primary btn-sm rounded-pill" to="/login">
                <span class="fa-thin fa-leaf-heart"></span>
                <span class="btn--text">Login</span>
              </router-link>
            </div>
            <div v-if="isLoggedIn" class="extra-menu d-none d-lg-block ps-4">
              <router-link class="btn btn-primary btn-sm rounded-pill" to="/users/me">
                <span icon="fa-thin fa-leaf-heart"></span>
                <span class="btn--text">User Account</span>
              </router-link>
            </div>
          </div>
          <!-- End Menu -->
        </div>
      </nav>
    </div>
  </header>
  <!-- Header End -->
  <main>
    <router-view :key="$route.fullPath" />
  </main>
  <!-- Footer -->
  <footer class="bg-white footer border-top">
    <div class="footer-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 my-3">
            <h5 class="h2">Please feel free to get in touch with us</h5>
          </div>
          <div class="col-lg-4 my-3">
            <div class="media">
              <div class="only-icon only-icon-lg text-primary">
                <i class="icon-map"></i>
              </div>
              <div class="media-body ps-4">
                <h6>Vencer Yoga Center</h6>
                <p class="m-0">
                  301 The Greenhouse
                  <br />
                  London, E2 8DY UK
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 my-3">
            <div class="media">
              <div class="only-icon only-icon-lg text-primary">
                <i class="icon-phone"></i>
              </div>
              <div class="media-body ps-4">
                <h6>Our Contact Info</h6>
                <p class="m-0">
                  support@domain.com
                  <br />
                  820-885-3321
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom border-top">
      <div class="container">
        <div class="row">
          <div class="col-md-6 my-3">
            <div class="nav justify-content-center justify-content-md-start">
              <a class="icon icon-sm icon-dark rounded-circle me-2" href="#">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a class="icon icon-sm icon-dark rounded-circle me-2" href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a class="icon icon-sm icon-dark rounded-circle me-2" href="#">
                <i class="fab fa-instagram"></i>
              </a>
              <a class="icon icon-sm icon-dark rounded-circle me-2" href="#">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div class="col-md-6 my-3 text-center text-md-end">
            <p class="m-0">
              © 2021 copyright
              <a href="pxdraft.com">pxdraft</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- End Footer -->
</template>

<script>
export default {
  data: function () {
    return {
      isLoggedIn: !!localStorage.jwt,
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
  methods: {
    // isLoggedIn: function () {
    //   return localStorage.getItem("jwt");
    // }
  },
};
</script>
