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
    <section class="bg-gray-100">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 my-4 pe-xl-10">
            <h1 class="display-1">Do green better with Alternatively Green</h1>
            <p class="lead w-lg-80">
              Alternatively Green is a company with big, green dreams. We provide sustainable, affordable alternatives
              for everyday household items. Click "All Products" to see all the products we currently have or "Signup"
              to create a user account.
            </p>
            <div class="pt-4">
              <router-link class="btn btn-dark rounded-pill me-3" to="/products">
                <span class="btn--text">All Products</span>
                <span class="arrow"></span>
              </router-link>
            </div>
            <div class="pt-4">
              <router-link class="btn btn-dark rounded-pill me-3" to="/signup">
                <span class="btn--text">Signup</span>
                <span class="arrow"></span>
              </router-link>
            </div>
          </div>
          <div class="col-lg-6 my-6">
            <img
              src="https://media.istockphoto.com/photos/zero-waste-cosmetics-picture-id1204067725?b=1&k=20&m=1204067725&s=170667a&w=0&h=kPuzcp-eaxi9YqMdEMMQmH9Uxy_yJ6yYFKJkHso9Bic="
              title=""
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
