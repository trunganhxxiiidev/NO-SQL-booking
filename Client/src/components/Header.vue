<template>
  <div class="header_section">
    <div class="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/" class="navbar-brand"><img src="../../public/images/logo.png" /></router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link  class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="about.html">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="news.html">News</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="testimonial.html">Testimonial</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="contact.html">Contact Us</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <div class="login_btn">
              <ul>
                <li><router-link to="/login" v-if="!userInfo.username">Login</router-link></li>
                <li>
                  <router-link to="/customer" v-if="userInfo.fullName">{{ userInfo.fullName || "User" }}</router-link>
                </li>
                <li>
                  <a href="#" v-if="userInfo.username" @click="logout()">Logout</a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-user" aria-hidden="true"></i></a>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "the-header",
  //
  setup() {
    const router = useRouter();
    const userInfo = computed(() => {
      const storedUserInfo = localStorage.getItem("userInfo");
      return storedUserInfo ? JSON.parse(storedUserInfo) : {};
    });
    const logout = () => {
      localStorage.setItem("userInfo", "");
      window.location.reload();
    };

    return { userInfo, logout };
  },
});
</script>

<style></style>
