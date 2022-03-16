import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersShow from "../views/UsersShow.vue";
import ProductsIndex from "../views/ProductsIndex.vue";
import ProductsShow from "../views/ProductsShow.vue";
import ProductsNew from "../views/ProductsNew.vue";
// import ReviewsNew from "../views/ReviewsNew.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: () => import(/* webpackChunkName: "about" */ "../views/About.vue") },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/users/me", name: "users-show", component: UsersShow },
  { path: "/products", name: "products-index", component: ProductsIndex },
  { path: "/products/:id", name: "products-show", component: ProductsShow },
  { path: "/products/new", name: "products-new", component: ProductsNew },
  // { path: "/reviews/new", name: "reviews-new", component: ReviewsNew },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
