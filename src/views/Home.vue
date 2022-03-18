<script>
export default {
  data: function () {
    return {};
  },
  created: function () {},
  methods: {},
};
</script>

<template>
  <div class="home">
    <section class="bg-gray-100 section">
      <div class="container pt-10">
        <div class="row align-items-center">
          <div class="col-lg-6 my-4 pe-xl-10">
            <h1 class="display-1">Do green better with Alternatively Green</h1>
            <p class="lead w-lg-80">Alternatively Green is a GREAT COMPANY!</p>
            <div class="pt-4">
              <router-link class="btn btn-dark rounded-pill me-3" to="/products">
                <span class="btn--text">All Products</span>
                <span class="arrow"></span>
              </router-link>
            </div>
            <div v-if="!isLoggedIn" class="pt-4">
              <router-link class="btn btn-dark rounded-pill me-3" to="/signup">
                <span class="btn--text">Signup</span>
                <span class="arrow"></span>
              </router-link>
            </div>
          </div>
          <div class="col-lg-6 my-4">
            <img
              src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2021_24/3471173/210507-amazon-climate-pledge-bd-2x1.jpg"
              title=""
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>
